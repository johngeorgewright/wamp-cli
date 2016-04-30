'use strict';

const autobahn = require('autobahn');
const pkg = require('./package.json');
const program = require('commander');
const REPL = require('./repl');

function start(url, realm) {
  let connection = new autobahn.Connection({url, realm});
  connection.onopen = REPL.begin;
  console.log(`Connection to ${url} ${realm}`)
  connection.open()
}

program
  .version(pkg.version)
  .arguments('<url> <realm>')
  .action(start)
  .parse(process.argv);

if (!program.args.length) program.help();
