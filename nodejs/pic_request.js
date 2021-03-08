request('http://static.xxx.com/cat.jpg')
  .pipe(fs.createWriteStream('doodle.png'));

// async
new Promise(function(resolve, reject){
  request({
    url: 'http://static.xxx.com/cat.jpg',
    encoding: 'binary'
  }, function(err, res, body) {
    resolve(body);
  });
}).then(function(body){
  fs.writeFileSync('avatar.png', body, 'binary');
})