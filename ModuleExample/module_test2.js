// require 호출 시 새로운 변수로 처리하여 아무 것도 없는 객체 반환
var user = require('./user2');

console.dir(user);


function showUser() {
	return user.getUser().name + ', ' + user.group.name;
}

console.log(showUser());