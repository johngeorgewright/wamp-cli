const Table = require('cli-table')
const repl = require('repl')
require('colors')

exports.start = connection => session => {
  const variableTable = new Table({head: ['Variable', 'Description']})
  variableTable.push(['connection', 'The WAMP connection'])
  variableTable.push(['seesion', 'The WAMP session'])
  console.log()
  console.log('Connected'.bold.green)
  console.log()
  console.log(variableTable.toString())
  console.log()

  const replServer = repl.start({
    prompt: '$> '.magenta
  })

  const reset = () => {
    Object.assign(replServer.context, {connection, session})
    replServer.once('exit', () => connection.close())
  }

  replServer.on('reset', reset)

  reset()
}
