// 사용자가 정의한 이벤트 (파라미터: emit이 전달한 파라미터)
process.on('tick', function(count) {
    console.log('tick 이벤트 발생함 : %s', count);
});

setTimeout(function() {
    console.log('2초 후에 tick 이벤트 전달 시도함.');
    
    // 이벤트와 '2'를 전달
    process.emit('tick', '2');
}, 2000);