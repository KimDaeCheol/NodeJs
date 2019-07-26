var Person = {
    age: 20,        // 속성 이름과 값은 :(콜론)으로 구분, 속성 간에는 ,(콤마)로 구분
    name: '소녀시대',
    add: function(a, b) {
        return a + b;
    }
};

console.log('더하기 : %d', Person.add(10, 10));