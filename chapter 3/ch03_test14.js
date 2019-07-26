var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23},
             {name:'애프터스쿨', age:25}];

console.log('배열 요소의 수 : %d', Users.length);
console.log('원본 Users');
console.dir(Users);

// 1번째와 2번째(3번째 바로 이전)를 Users2에 복사
var Users2 = Users.slice(1, 3);

console.log('slice()로 잘라낸 후 Users2');
console.dir(Users2);

// 1번째 요소를 Users3에 복사
var Users3 = Users2.slice(1);

console.log('slice()로 잘라낸 후 Users3');
console.log(Users3);