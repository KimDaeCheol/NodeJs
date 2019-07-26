// Person 생성자 정의
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Person의 walk 함수 정의 (프로토타입 시 메모리의 효율적 관리 가능)
Person.prototype.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
}

var person01 = new Person('소녀시대', 20);
var person02 = new Person('걸스데이', 22);

console.log(person01.name + '객체의 walk(10)을 호출합니다.');
person01.walk(10);