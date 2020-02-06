// 몽고디비 모듈 사용
var mongodb = require('mongodb');
var mongoose = require('mongoose');

// 데이터베이스 연결
var database;
var UserSchema;
var UserModel;

// DB연결 및 응답 객체 속성 추가
function connectDB() {
	var databaseurl = 'mongodb://localhost:27017/local';

	mongoose.connect(databaseurl);
	database = mongoose.connection;

	database.on('error', console.error.bind(console, 'mongoose connection error.'));
	database.on('open', function() {
		console.log('데이터베이스에 연결되었습니다 : ' + databaseurl);

		createUserSchema();

		doTest();
	});
	database.on('disconnected', connectDB);
}

function createUserSchema() {
	UserSchema = mongoose.Schema({
		id: {type: String, required: true, unique: true},
		name: {type: String, index: 'hashed', 'default':''},
		age: {type: Number, 'default': -1},
		created_at: {type: Date, index: {unique: false}, 'default': Date.now},
		updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

	UserSchema
		.virtual('info')
		.set(function(info) {
			var splitted = info.split(' ');
			this.id = splitted[0];
			this.name = splitted[1];
			console.log('virtual info 설정함 : %s, %s', this.id, this.name);
		})
		.get(function() {return this.id + ' ' + this.name});

	console.log('UserSchema 정의함.');

	UserModel = mongoose.model("users4", UserSchema);
	console.log('UserModel 정의함.');
}

function doTest() {
	var user = new UserModel({"info": 'test01 dckat'});

	user.save(function(err) {
		if (err) {throw err;}

		console.log('사용자 데이터 추가함.');

		findAll();
	});

	console.log('info 속성에 값 할당함.');
	console.log('id: %s, name: %s', user.id, user.name);
}

function findAll() {
	UserModel.find({}, function(err, results) {
		if (err) {throw err;}

		if (results) {
			console.log('조회된 user 문서 객체 #0 -> id: %s, name: %s',
				results[0]._doc.id, results[0]._doc.name);
		}
	});
}

connectDB();