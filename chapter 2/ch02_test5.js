var calc = require('./calc'); // calc 파일 불러오기
console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(10, 10));

var calc2 = require('./calc2'); // calc2 파일 불러오기
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', calc2.add(10, 10));