var Calc = require('./calc3');

var calc = new Calc();

// stop 이벤트 전달
calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달함.');