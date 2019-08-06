var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists) {
    if(exists) {
        // 기존 파일 삭제
        fs.unlink(outname, function(err) {
            if(err) throw err;
            console.log('기존 파일 [' + outname + '] 삭제함.');
        });
    }
    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});
    infile.pipe(outfile); // 두 개의 스트림을 붙여서 data를 전달
    console.log('파일 복사 [' + inname + '] -> [' + outname + ']');
});