var fs = require('fs');

// 파일을 비동기식 IO로 읽기
fs.readFile('./package.json', 'utf8', function(err, data) {
    console.log(data); // 읽은 데이터 출
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');