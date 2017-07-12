var date = new Date();
var fs = require('fs');
var request = require('request');


function done(output) {
  process.stdout.write(output);
}

function commandFunc(command, stdinStr) {

  var allCommands = command.split(/\s*\|\s*/g);
  var commands = allCommands[0].split(' ');

  if (commands[0] === 'pwd') {
    done('You typed: ' + process.cwd());
  }
  if (commands[0] === 'date') {
    done('You typed: ' + date);
  }

  if (commands[0] === 'ls') {
    fs.readdir('.', function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        done('' + file.toString() + '\n');
        // questions: with '' in the front, the output start from the second line
        // without it, there will be a new 'prompt >'
      });
    });

  }

  if (commands[0] === 'echo') {
    commands.slice(1).forEach(function(value){
      done(value + ' ');
    });
  }

  if (commands[0] === 'cat') {
    var tempOutput = '';

    fs.readFile('./' + commands[1], function(err, data){
      if (err) throw err;
      tempOutput += '\n' + data;

      allCommands.shift();
      if (allCommands.length > 0) {
        commandFunc(allCommands[0], tempOutput);
      }
      else {
        done(tempOutput);
      }


    });
  }

  if (commands[0] === 'head') {
    if (!stdinStr) {
      var tempOutput = '';
      fs.readFile('./' + commands[1], function(err, data){
        if (err) throw err;

        var headLines = data.toString().split("\n").slice(0, 5);
        headLines.forEach(function(line){
          tempOutput += line + '\n';
        });

        // check following commands, if there is no commmand, done

      });
    }
    else {
      var tempOutput = '';
      // read stdin
      var headLines = stdinStr.split("\n").slice(0, 5);

      // compose the tempOutput
       headLines.forEach(function(line){
          tempOutput += line + '\n';
        });

      allCommands.shift();
      if (allCommands.length > 0) {
        commandFunc(allCommands[0], tempOutput);
      }
      else {
        done(tempOutput);
      }
      // check following commands, if therer is no commmand, done
    }
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
          commandFunc('find ' + commands[1] + '/' + files[i]);
        }
      }


    });
    }

}



module.exports = {
  commandFunc: commandFunc
};
