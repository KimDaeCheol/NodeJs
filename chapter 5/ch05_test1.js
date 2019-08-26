var http = require('http');

// 웹 서버 객체 만들기
var server = http.createServer();

// 웹 서버 시작 (192.168.220.1 IP와 3000번 포트에서 대기)
var host = '192.168.220.1';
var port = 3000;
server.listen(port, host, '50000', function() {
    console.log('웹 서버가 시작되었습니다. : %s, %d', host, port); // 웹 서버 실행 시 호출 함수`
});