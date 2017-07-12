var commandFunc = require('./commands.js');
// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  commandFunc.commandFunc(cmd);


  process.stdout.write('\nprompt > ');

});

/*
Note that our process will keep running after your command is executed.
That's because we've registered a listener to stdin,
so Node won't kill the process automatically,
as it assumes you may want to keep waiting for more user input.
*/
