import Table from 'cli-table'
import * as repl from 'node:repl'
import 'colors'
import { Connection, Session } from 'autobahn'

export const start = (connection: Connection) => (session: Session) => {
  const variableTable = new Table({ head: ['Variable', 'Description'] })
  variableTable.push(['connection', 'The WAMP connection'])
  variableTable.push(['session', 'The WAMP session'])

  console.info()
  console.info('Connected'.green.bold)
  console.info()
  console.info(variableTable.toString())
  console.info()

  const replServer = repl.start({
    prompt: '$> '.magenta,
  })

  replServer.on('reset', reset)

  reset()

  function reset() {
    Object.assign(replServer.context, { connection, session })
    replServer.once('exit', () => connection.close())
  }
}
