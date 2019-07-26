var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}];
console.log('push() 호출 전 배열 요소의 수 : %d', Users.length);

// 배열 맨 뒤에 요소 추가
Users.push({name:'티아라', age:23});
console.log('push() 호출 후 배열 요소의 수 : %d', Users.length);

// 맨 뒤의 요소를 제거
Users.pop();
console.log('pop() 호출 후 배열 요소의 수 : %d', Users.length);