function app() {
  return new Application();
}
function Application(){
  this.stack = []
}
Application.prototype.get =function(path, ...handler) {
  let layer = new Layer(path, handler).data;
  this.stack.push(layer);
}
Application.prototype.dispatch = function(pathname) {
  for (let i = 0; i < this.stack.length; i++) {
    let {path, handler} = this.stack[i];
    if (path === pathname) {
      let i = 0;
      console.log(i , handler.length );
      while (i < handler.length) {
        handler[i]('a','b', handler[++i]);
      }
      
    }
  }
}
function Layer(path, handler) {
  this.data = {
    path,
    handler
  }
}

let server = new Application();
server.get('/', (req, res, next) => {
  console.log(1)
  next();
},(req, res,next) => {
  console.log(11)
  next();
})
server.dispatch('/');

