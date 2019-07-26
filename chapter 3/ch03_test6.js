var Person = {};

Person['age'] = 20;
Person['name'] = '소녀시대';

// 함수 oper 정의
var oper = function(a, b) {
    return a + b;
};

// 함수를 Person 객체에 저장
Person['add'] = oper;

console.log('더하기 : %d', Person.add(10, 10));