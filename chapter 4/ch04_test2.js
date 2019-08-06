// on(event, listener) -> 이벤트의 리스너 추가 (Timeout 먼저 수행 후 2초 후 실행)
process.on('exit', function() {
    console.log('exit 이벤트 발생함.');
});

// 2초 후 종료가 실행
setTimeout(function(){
    console.log('2초 후에 시스템 종료 시도함.');
    
    process.exit();
}, 2000);