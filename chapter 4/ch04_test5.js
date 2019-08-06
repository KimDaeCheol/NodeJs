// filestream 모듈 불러오기
var fs = require('fs');

// 파일을 동기식 IO로 읽기
var data = fs.readFileSync('./package.json', 'utf8');

// 읽은 데이터를 출력
console.log(data);