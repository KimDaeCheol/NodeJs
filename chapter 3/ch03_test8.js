var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}];

Users.push({name:'티아라', age:23}); // 객체에 추가

console.log('사용자 수 : %d', Users.length); // 객체 배열의 길이 출력
console.log('첫 번째 사용자 이름 : %s', Users[0].name);