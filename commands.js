var date = new Date();
var fs = require('fs');
var request = require('request');

function done(output) {
  process.stdout.write(output);
  //process.stdout.write('\nprompt > ');
}

function commandFunc(command) {
  if (command === 'pwd') {
    done('You typed: ' + process.cwd());

  }
  if (command === 'date') {
    done('You typed: ' + date);

  }

  if (command === 'ls') {
    fs.readdir('.', function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        done('' + file.toString() + '\n');
        // questions: with '' in the front, the output start from the second line
        // without it, there will be a new 'prompt >'
      });
    });

  }

}

function echoFunc(command) {
  var commands = command.split(' ');
  if (commands[0] === 'echo') {
    commands.slice(1).forEach(function(value){
      done(value + ' ');
    });
  }
}

function filesFunc(command) {
  var commands = command.split(' ');
  if (commands[0] === 'cat') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;
      done('\n' + data);
    });
  }

  if (commands[0] === 'head') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var headLines = data.toString().split("\n").slice(0, 5);
      headLines.forEach(function(line){
        done(line + "\n");
      });

    });
  }

  if (commands[0] === 'tail') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var tailLines = data.toString().split("\n").slice(-6, -1);
      tailLines.forEach(function(line){
        done(line + "\n");
      });

    });
  }

  if (commands[0] === 'sort') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var lines = data.toString().split("\n").sort();
      lines.forEach(function(line){
        done(line + '\n');
      });
      });

    }
  if (commands[0] === 'wc') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var lines = data.toString().split("\n");
      done(lines.length.toString());
      });
    }

   if (commands[0] === 'uniq') {
    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;

      var lines = data.toString().split("\n");
      var result = [];

      lines.forEach(function(line){
        if (!result.includes(line)) {
          result.push(line);
          }
        });

      result.forEach(function(ele){
        done(ele + '\n');
      });

      });
    }

    if (commands[0] === 'curl') {
      request(commands[1], function(err, res, body){
        if (err) throw err;
        done(body);
      });
    }

    if (commands[0] === 'find') {
      fs.readdir(commands[1], function(err, files){
      if (err) throw err;


      files.forEach(function(file){
          done(commands[1] + '/' + file.toString() + "\n")
      });

      for (var i = 0; i < files.length; i++) {
        if (fs.lstatSync(commands[1] + '/' + files[i]).isDirectory()) {
          filesFunc('find ' + commands[1] + '/' + files[i]);
        }
      }


    });
    }

}



module.exports = {
  commandFunc: commandFunc,
  echoFunc: echoFunc,
  filesFunc: filesFunc
};
