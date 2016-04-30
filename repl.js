'use strict';

const inquirer = require('inquirer');

class REPL {
  constructor(session) {
    this.session = session;
    this.evalute = this.evalute.bind(this);
    this.printSuccess = this.printSuccess.bind(this);
    this.printError = this.printError.bind(this);
    this.loop = this.loop.bind(this);
  }

  read() {
    return inquirer
      .prompt([{name: 'query', message: '-->'}])
      .then(answers => answers.query);
  }

  evalute(query) {
    let args = query.split(/\s+/g);
    let type = args.shift();
    let name = args.shift();
    console.log(`> --> session.${type}('${name}', [${query}])`);
    return this.session[type](name, parseArgs(args));
  }

  printSuccess(result) {
    console.log(result);
  }

  printError(error) {
    if (error.stack) console.error(error.stack);
    else console.error(error);
  }

  loop() {
    return this
      .read()
      .then(this.evalute)
      .then(this.printSuccess, this.printError)
      .then(this.loop);
  }
}

REPL.begin = session => {
  console.log('Connected');
  console.log('Usage: <call|publish> <name> [arg] [arg]')
  let repl = new REPL(session);
  repl.loop();
};

function parseArgs(args) {
  return args.map(JSON.parse);
}

module.exports = REPL;
