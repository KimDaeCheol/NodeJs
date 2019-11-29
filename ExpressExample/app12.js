// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(expressSession({
	secret: 'my key',
	resave: true,
	saveUninitialized: true
}));

var router = express.Router();

router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	// 이미 로그인된 상태
	if (req.session.user) {
		console.log('이미 로그인된 상품 페이지로 이동합니다.');

		res.redirect('/public/product.html');
	}
	// 세션 저장
	else {
		req.session.user = {
			id: paramId,
			name: 'dckat',
			authorized: true
		};

		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write(" <br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
		res.end();
	}
});

router.route('/process/showCookie').get(function(req, res) {
	console.log('/process/showCookie 호출됨.');

	res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req, res) {
	console.log('/process/setUserCookie 호출됨.');

	// 쿠키 설정
	res.cookie('user', {
		id: 'mike',
		name: '소녀시대',
		authorized: true
	});

	// redirect로 응답
	res.redirect('/process/showCookie');
});

// 상품정보 라우팅 함수
router.route('/process/product').get(function(req, res) {
	console.log('/process/product 호출됨.');

	if (req.session.user) {
		res.redirect('/public/product.html');
	}
	else {
		res.redirect('/public/login2.html');
	}
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제
router.route('/process/logout').get(function(req, res) {
	console.log('/process/logout 호출됨.');

	// 로그인된 상태
	if(req.session.user) {
		console.log('로그아웃합니다.');

		req.session.destroy(function(err) {
			if (err)
				throw err;
			console.log('세션을 삭제하고 로그아웃되었습니다.');
			res.redirect('/public/login2.html');
		});
	}
	// 로그인 안된 상태
	else {
		console.log('아직 로그인되어 있지 않습니다.');

		res.redirect('/public/login2.html');
	}
});

app.use('/', router);

var errorHandler = expressErrorHandler({
	static: {
		'404': './public/404.html'
	}
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

http.createServer(app).listen(3000, function() {
	console.log('Express 서버가 3000번 포트에서 시작됨.');
});