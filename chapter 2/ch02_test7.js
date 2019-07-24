var os = require('os');

console.log('시스템의 hostname ; %s', os.hostname()); // 운영체제 호스트 이름 출력
console.log('시스템의 메모리 : %d / %d', os.freemem(), os.totalmem()); // 메모리 출력
console.log('시스템의 CPU 정보\n');
console.dir(os.cpus()); // cpu 정보 출력
console.log('시스템의 네트워크 인터페이스 정보\n');
console.dir(os.networkInterfaces()); // 네트워크 인터페이스 정보 출력