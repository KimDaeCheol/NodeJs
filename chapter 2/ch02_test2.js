console.log('argv 속성의 파라미터 수 : ' + process.argv.length); // command에 실행시킨 프로세스 수
console.dir(process.argv); // 실행시킨 프로세스를 리스트 형태 출력

if (process.argv.length > 2) {
    console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index) {
    console.log(index + ' : ', item);
}); // 각각의 프로세스의 item 출력