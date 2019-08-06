var util = require('util');
// EventEmitter는 event 모듈에 정의 -> event 모듈에서 호출한 후 EventEmitter 객체 참조
var EventEmitter = require('events').EventEmitter;

// Calc 객체를 프로토타입 객체로 정의 (this 키워드로 자기 자신을 가리킴)
var Calc = function() {
    var self = this;
    
    this.on('stop', function() {
        console.log('Calc에 stop event 전달됨.');
    });
};

// Calc가 처리하도록 EventEmitter를 상속 (util 모듈 이용)
util.inherits(Calc, EventEmitter);

// 프로토타입 속성으로 add 함수 정의
Calc.prototype.add = function(a, b) {
    return a + b;
}

// 모듈을 불러오는 쪽에서 Calc 객체를 참조
module.exports = Calc;
module.exports.title = 'calculator';