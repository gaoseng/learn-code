

const configUrl = 'zf/:id/:name';

configUrl.replace(/:([^\/]+)/g, function() {
  console.log(arguments);
})