// require 함수의 동작원리 (정의한 export 객체 반환)
var require = function(path) {
	var exports = {
		getUser: function() {
			return {id: 'test01', name: '김대철'};
		},
		group: {id: 'group01', name: '친구'}
	}

	return exports;
}

var user = require('...');

function showUser() {
	return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보: %s', showUser());