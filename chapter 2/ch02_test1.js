var result = 0;

console.time('duration_sum');

for(var i = 1; i<=1000; i++){
    result += i;
}

console.timeEnd('duration_sum'); // time ~ timeEnd까지의 시간 측정
console.log('1부터 1000까지 더한 결과물 : %d', result);

console.log('현재 실행한 파일의 이름 : %s', __filename);
console.log('현재 실행한 파일의 패스 : %s', __dirname);

var Person = {name:"소녀시대", age:20};
console.dir(Person); // dir: 객체와 관련된 속성을 모두 출력