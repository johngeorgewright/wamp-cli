import Table from 'cli-table'
import repl from 'repl'
import 'colors'
import { Connection, Session } from 'autobahn'

export const start = (connection: Connection) => (session: Session) => {
  const variableTable = new Table({ head: ['Variable', 'Description'] })
  variableTable.push(['connection', 'The WAMP connection'])
  variableTable.push(['session', 'The WAMP session'])
  console.log()
  console.log('Connected'.green.bold)
  console.log()
  console.log(variableTable.toString())
  console.log()

  const replServer = repl.start({
    prompt: '$> '.magenta,
  })

  const reset = () => {
    Object.assign(replServer.context, { connection, session })
    replServer.once('exit', () => connection.close())
  }

  replServer.on('reset', reset)

  reset()
}
