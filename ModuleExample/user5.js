// module.exports 사용하면 exports는 무시
module.exports = {
	getUser: function() {
		return {id: 'test01', name: '김대철'};
	},
	group: {id: 'group01', name: '친구'}
}

exports.group = {id: 'group02', name: '가족'};