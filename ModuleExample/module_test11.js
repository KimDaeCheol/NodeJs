// exports에 속성 이름을 주면서 프로토타입을 정의한 후 반환
var User = require('./user11').User;
var user = new User('test01', '김대철');

user.printUser();