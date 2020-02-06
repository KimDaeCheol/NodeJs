// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express 미들웨어 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;

// mongoose 모듈 불러오기
var mongoose = require('mongoose');

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;

// 데이터베이스 연결
function connectDB() {
	var databaseUrl = 'mongodb://localhost:27017/local';

	console.log('데이터베이스 연결을 시도합니다.');
	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl);
	database = mongoose.connection;

	database.on('error', console.error.bind(console, 'mongoose connection error.'));
	database.on('open', function() {
		console.log('데이터베이스에 연결되었습니다: ' + databaseUrl);

		// 스키마 정의
		UserSchema = mongoose.Schema({
			id: {type: String, require: true, unique: true},
			password: {type: String, require: true},
			name: {type: String, index: 'hashed'},
			age: {type: Number, 'default': -1},
			created_at: {type: Date, index: {unique: false}, 'default': Date.now},
			updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
		});

		// 스키마에 static 메소드  추가
		UserSchema.static('findById', function(id, callback) {
			return this.find({id: id}, callback);
		});

		UserSchema.static('findAll', function(callback) {
			return this.find({ }, callback);
		});
		console.log('UserSchema 정의함.');

		// UserModel 정의
		UserModel = mongoose.model("users2", UserSchema);
		console.log('UserModel 정의함.');
	});

	// 연결이 끊어졌을 때 5초후 재연결
	database.on('disconnected', function() {
		console.log('연결이 끊어졌습니다. 5초 후 다시 연결합니다.');
		setInterval(connectDB, 5000);
	});
}

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret: 'my key',
	resave: true,
	saveUninitialized: true
}));

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스 정보와 비교
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.param('id');
	var paramPassword = req.param('password');

	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}

			if (docs) {
				console.dir(docs);
				var username = docs[0].name;
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html>다시 로그인하기</a>");
				res.end();
			}
			else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 실패</h1>');
				res.write('<div><p>아이다와 비밀번호를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	}
	else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
});

// 사용자 추가 라우팅 함수
router.route('/process/adduser').post(function(req, res) {
	console.log('/process/adduser 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	var paramName = req.body.name || req.query.name;

	console.log('요청 파라미터: ' + paramId + ', ' + paramPassword + ', ' + paramName);

	// 데이터베이스 객체가 초기화된 경우
	if (database) {
		addUser(database, paramId, paramPassword, paramName, function(err, result) {
			if (err) {throw err;}

			// 결과 객체 확인하여 응답 전송
			if (result) {
				console.dir(result);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			}
			else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 실패</h2>');
				res.end();
			}
		});
	}
	else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
});

// 사용자 리스트 함수
router.route('/process/listuser').post(function(req, res) {
	console.log('/process/listuser 호출됨.');

	// 데이터베이스 객체가 초기화된 경우
	if (database) {
		// 모든 사용자 검색
		UserModel.findAll(function(err, results) {
			// 오류 발생시
			if (err) {
				console.error('사용자 리스트 조회 중 오류 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();

				return;
			}

			if (results) {
				console.dir(results);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트</h2>');
				res.write('<div><ul>');

				for (var i = 0 ; i < results.length ; i++) {
					var curId = results[i]._doc.id;
					var curName = results[i]._doc.name;
					res.write('   <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
				}

				res.write('</ul></div>');
				res.end();
			}
			else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회 실패</h2>');
				res.end();
			}
		});
	}
	else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
});

// 라우터 객체 등록
app.use('/', router);

// 사용자 추가 함수
var addUser = function(database, id, password, name, callback) {
	console.log('addUser 호출됨: ' + id + ', ' + password + ', ' + name);

	// UsersModel 인스턴스 생성
	var user = new UserModel({"id": id, "password": password, "name": name});

	// save()로 저장
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
		console.log("사용자 데이터 추가함.");
		callback(null, user);
	});
}

// 사용자 인증 함수
var authUser = function(database, id, password, callback) {
	console.log('authUser 호출됨.');

	// 1. 아이디를 사용하여 검색
	UserModel.findById(id, function(err, results) {
		if (err) {
			callback(err, null);
			return;
		}

		console.log('아이디[%s]로 사용자 검색 결과', id);
		console.dir(results);

		if (results.length > 0) {
			console.log('아이디와 일치하는 사용자 찾음.');

			// 2. 비밀번호 확인
			if (results[0]._doc.password === password) {
				console.log('비밀번호 일치함');
				callback(null, results);
			}
			else {
				console.log('비밀번호 일치하지 않음');
				callback(null, null);
			}
		}
		else {
			console.log('아이디와 일치하는 사용자를 찾지 못함.');
			callback(null, null);
		}
	});
}

// ===== 404 오류 페이지 처리 ===== //
var errorHandler = expressErrorHandler({
	static: {
		'404': './public/404.html'
	}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// ===== 서버 시작 ===== //
http.createServer(app).listen(app.get('port'), function() {
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 연결
	connectDB();
});