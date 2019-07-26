function add(a, b, callback) {
    var result = a + b;
    callback(result);
    
    var count = 0;
    
    // 함수 객체 선언
    var history = function() {
        count++;
        return count + ' : ' + a + ' + ' + b + ' = ' + result;
    };
    return history;
}

var add_history = add(10, 10, function(result) {
    console.log('파라미터로 전달된 콜백 함수 호출됨.');
    console.log('더하기 (10, 10)의 결과 : %d', result);
});

// 함수 내부의 함수 객체가 실행 될때 마다 1씩 증가 -> 변수 접근이 허용(클로저) 
console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history());
console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history());
console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history());