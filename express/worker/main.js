
if (window.Worker) {
  const worker = new Worker('worker.js');
  worker.postMessage('hello worker');
  worker.onmessage =(e) => {
    console.log('onmessage',e);
  }
}