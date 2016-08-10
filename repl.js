'use strict';

const repl = require('repl')
require('colors')

exports.start = connection => session => {
  console.log('Connected'.bold.green);
  console.log('Usage: <.call|.publish> <name> [...args]'.italic.yellow);
  console.log();

  const evalute = (type, query) => {
    let args = query.split(/\s+/g).filter(v => !!v);
    let name = args.shift();
    let parsedArgs = parseArgs(args);
    console.log(`-> session.${type}('${name}', [${parsedArgs}])`);
    session[type](name, parsedArgs)
      .then(result => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch(error => console.error(
        `ERROR: ${error.error.bold.red}` +
        error.args.map(arg => `\n\t${arg}`)
      ))
  }

  const createAction = type => (
    function (query) {
      this.lineParser.reset();
      this.bufferedCommand = '';
      evalute(type, query);
    }
  );

  let replServer = repl.start({
    prompt: '$> '.magenta
  });

  replServer.defineCommand('call', {
    help: 'Call a procedure',
    action: createAction('call')
  });

  replServer.defineCommand('publish', {
    help: 'Publish an event',
    action: createAction('publish')
  });

  replServer.on('exit', () => connection.close());
};

function parseArgs(args) {
  return args.map(arg => {
    switch (typeof arg) {
      case 'string':
      case 'number':
        return arg;
      default:
        return JSON.parse(arg);
    }
  });
}
