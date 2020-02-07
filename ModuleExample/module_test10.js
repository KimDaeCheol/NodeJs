// module.exports에 프로토타입 객체를 정의한 후 할당

var User = require('./user10');
var user = new User('test01', '김대철');

user.printUser();