const fs = require('fs');


fs.open(__dirname + '/data.txt','r', (err,fd)=> {
  if (err) throw err;
  let buf = Buffer.alloc(20);
  let a =new Buffer(buf.length)
  !function read() {
    fs.read(fd, buf, 0, 10, null, (err, bytesRead) => {
      console.log(1)
      if (bytesRead) {
        console.log(bytesRead, buf)
        // read();
        console.log(buf.toString());
      }
    })
  }()
})