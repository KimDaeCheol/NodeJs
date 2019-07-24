var nconf = require('nconf'); // nconf: 시스템 환경 접근 변수
nconf.env(); // 환경 변수에 대한 정보를 가져옴

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));