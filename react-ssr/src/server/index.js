const express = require('express');
const path = require('path');
import render from './render';
import proxy from 'express-http-proxy';


let app = express();
app.use(express.static(path.resolve('public')));
app.use('/api', proxy('http://127.0.0.1:4000', {
  proxyReqPathResolver(req) {
    return `/api${req.url}`
  }
}));

app.get('*', (req, res) => {
  render(req, res);
})

app.listen(3000, () => console.log('服务器已启动'));