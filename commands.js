var date = new Date();
var fs = require('fs');

function commandFunc(command) {
  if (command === 'pwd') {
    process.stdout.write('You typed: ' + process.cwd());
  }
  if (command === 'date') {
    process.stdout.write('You typed: ' + date);

  }

  if (command === 'ls') {
    fs.readdir('.', function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        process.stdout.write(file.toString() + "\n" )
      });
    });
  }

}

function echoFunc(command) {
  var commands = command.split(' ');
  if (commands[0] === 'echo') {
    commands.slice(1).forEach(function(value){
      process.stdout.write(value + ' ');
    });
  }
}

function filesFunc(command) {
  var commands = command.split(' ');
  if (commands[0] === 'cat') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;
      process.stdout.write(data);
    });
  }

  if (commands[0] === 'head') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var headLines = data.toString().split("\n").slice(0, 5);
      headLines.forEach(function(line){
        process.stdout.write(line + "\n");
      });

    });
  }

  if (commands[0] === 'tail') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var tailLines = data.toString().split("\n").slice(-6, -1);
      tailLines.forEach(function(line){
        process.stdout.write(line + "\n");
      });

    });
  }

  if (commands[0] === 'sort') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var lines = data.toString().split("\n").sort();
      lines.forEach(function(line){
        process.stdout.write(line + '\n');
      });
      });

    }
  if (commands[0] === 'wc') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var lines = data.toString().split("\n");
      process.stdout.write(lines.length.toString());
      });
    }


}


module.exports = {
  commandFunc: commandFunc,
  echoFunc: echoFunc,
  filesFunc: filesFunc
};
