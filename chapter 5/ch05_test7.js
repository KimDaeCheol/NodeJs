var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

// get 파라미터 -> 다른 사이트의 정보와 콜백 함수(응답 데이터 받을 때에는 data와 end 이벤트로 처리)
var req = http.get(options, function(res) {
    // 응답 처리
    var resData = '';
    res.on('data', function(chunk) {
        resData += chunk;
    });
    
    res.on('end', function() {
        console.log(resData);
    });
});

// error 이벤트 처리
req.on('error', function(err) {
    console.log("오류 발생 : " + err.message);
});