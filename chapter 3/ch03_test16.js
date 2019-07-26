function add(a, b, callback) {
    var result = a + b;
    callback(result);
    
    // 함수 객체를 만들어서 반환 (어떤 연산이 실행되었는지를 알려줌)
    var history = function() {
        return a + ' + ' + b + ' = ' + result;
    };
    return history;
}

// add를 호출하면서 history라는 함수 객체를 가져옴
var add_history = add(10, 10, function(result) {
    console.log('파라미터로 전달된 콜백 함수 호출됨.');
    console.log('더하기 (10, 10)의 결과 : %d', result);
});

console.log('결과 값으로 받은 함수의 실행 결과 : ' + add_history());