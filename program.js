const autobahn = require('autobahn')
const pkg = require('./package.json')
const program = require('commander')
const repl = require('./repl')
require('colors')

function start (url, realm) {
  let connection = new autobahn.Connection({url, realm})
  connection.onopen = repl.start(connection)
  connection.onclose = (reason, details) => {
    console.error('Connection lost'.red)
    console.error(reason)
    console.error(details)
  }
  console.log(`Connecting to ${url} ${realm}`.italic.yellow)
  connection.open()
}

program
  .version(pkg.version)
  .arguments('<url> <realm>')
  .action(start)
  .parse(process.argv)

if (!program.args.length) program.help()
