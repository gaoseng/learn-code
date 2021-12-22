onmessage = (e) => {
  console.log('worker', e);
  postMessage('i recerve this message');
}