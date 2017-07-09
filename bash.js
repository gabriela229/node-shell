var commandFunc = require('./commands.js');
// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  commandFunc.commandFunc(cmd);
  commandFunc.echoFunc(cmd);
  commandFunc.filesFunc(cmd);

  process.stdout.write('\nprompt > ');

});
