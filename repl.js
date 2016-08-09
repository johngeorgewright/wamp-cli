'use strict';

const repl = require('repl')
require('colors')

class Evaluator {
  constructor(session) {
    this.session = session;
    this.evalute = this.evalute.bind(this);
  }

  evalute(type, query) {
    let args = query.split(/\s+/g).filter(v => !!v);
    let name = args.shift();
    let parsedArgs = parseArgs(args);
    console.log(`-> session.${type}('${name}', [${parsedArgs}])`);
    this
      .session[type](name, parsedArgs)
      .then(result => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch(error => console.error(
        `ERROR: ${error.error.bold.red}` +
        error.args.map(arg => `\n\t${arg}`)
      ))
  }
}

exports.start = connection => session => {
  console.log('Connected'.bold.green);
  console.log('Usage: <.call|.publish> <name> [...args]'.italic.yellow);
  console.log();

  let evaulator = new Evaluator(session);

  let replServer = repl.start({
    prompt: '$> '.magenta
  });

  replServer.defineCommand('call', {
    help: 'Call a procedure',
    action: function (query) {
      this.lineParser.reset();
      this.bufferedCommand = '';
      evaulator.evalute('call', query);
    }
  });

  replServer.defineCommand('publish', {
    help: 'Publish an event',
    action: function (query) {
      this.lineParser.reset();
      this.bufferedCommand = '';
      evaulator.evalute('publish', query);
    }
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
