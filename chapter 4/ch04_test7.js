var fs = require('fs');

// 파일에 데이터 쓰기 (파일이름, 쓸 내용, 끝나면 호출될 콜백 함수)
fs.writeFile('./output.txt', 'Hello World!', function(err) {
    // 작업 중 오류 발생 시 실행 함수
    if(err) {
        console.log('Error : ' + err);
    }
    
    console.log('output.txt 파일에 데이터 쓰기 완료.');
});