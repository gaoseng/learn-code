let fs = require('fs');
let path = require('path');

function readFile(filename) {
  return  new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname,filename), {
      encoding: 'utf8',
      flag: 0o666
    }, function(err, data) {

      if (err) {
        console.log(filename, err)
        reject(err)
      }
      else {
        console.log(filename, data)
        resolve(data)
      }
    })
  })
}

function *read() {
  let template = yield readFile('./template.txt');
  let data = yield readFile('./data.txt');
  return template + '+' + data;
}

function co(gen){
  let it = gen();
  return new Promise((resolve, reject) =>{
    !function next(lastVal) {
      let {value, done} = it.next(lastVal);
      console.log('next', value, done)
      if (done) resolve(value);
      else value.then(next, reason => reject(reason));
    }()
  })
}

co(read).then(res => console.log(res), err => console.log(err));
