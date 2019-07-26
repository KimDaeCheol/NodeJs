var Person = {};

Person['age'] = 20;
Person['name'] = '소녀시대';
Person.add = function(a, b) {
    return a + b;
}; // Person 객체에 add 함수 정의

console.log('더하기 : %d', Person.add(10, 10)); // 객체에 정의된 함수를 호출하여 Person.add로 표현