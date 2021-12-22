const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve('worker')));

app.listen(3000, () => console.log('服务器已启动'));