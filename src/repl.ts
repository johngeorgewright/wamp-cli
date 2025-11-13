import Table from 'cli-table'
import * as repl from 'node:repl'
import 'colors'
import { Connection, Session } from 'autobahn'
import { inspect } from 'node:util'
import YAML from 'yaml'

export const start = (connection: Connection) => (session: Session) => {
  const commandTable = new Table({ head: ['Command', 'Description'] })
  commandTable.push(['.SUB <topic>', 'Subscript to a topic'])
  commandTable.push(['.PUB <topic>', 'Publish to a topic'])
  commandTable.push(['.REG <procedure>', 'Register a RPC endpoint'])
  commandTable.push(['.CALL <procedure>', 'Call a RPC endpoint'])

  const variableTable = new Table({ head: ['Variable', 'Description'] })
  variableTable.push(['connection', 'The WAMP connection'])
  variableTable.push(['session', 'The WAMP session'])

  console.info()
  console.info('Connected'.green.bold)
  console.info()
  console.info(commandTable.toString())
  console.info()
  console.info(variableTable.toString())
  console.info()

  const replServer = repl.start({
    prompt: '$> '.magenta,
  })

  replServer.defineCommand('SUB', {
    help: 'Subscript to a topic.',
    async action(topic) {
      if (!topic) {
        console.error('Usage: .SUB <topic>'.red)
        this.displayPrompt()
        return
      }

      try {
        await session.subscribe(topic.trim(), (args, kwargs) => {
          process.stdout.write('\r')
          console.info(
            'PUB>'.cyan,
            `${topic}>`.yellow,
            inspect({ args, kwargs }, false, 10),
          )
          this.displayPrompt()
        })
        console.info('Subscribed to', topic.green)
      } catch (error) {
        console.error(
          `Error: ${error instanceof Error ? error.message : String(error)}`
            .red,
        )
      }

      this.displayPrompt()
    },
  })

  replServer.defineCommand('PUB', {
    help: 'Publish to a topic.',
    action(topic) {
      if (!topic) {
        console.error('Usage: .PUB <topic>'.red)
        this.displayPrompt()
        return
      }

      this.question('Enter args (YAML array)> '.magenta, (argsInput) => {
        this.question(
          'Enter kwargs (YAML object)> '.magenta,
          async (kwargsInput) => {
            try {
              const args = argsInput.trim() ? YAML.parse(argsInput) : []
              const kwargs = kwargsInput.trim() ? YAML.parse(kwargsInput) : {}

              await session.publish(topic.trim(), args, kwargs, {
                exclude_me: false,
              })
              console.info(
                'Published to',
                topic.green,
                inspect({ args, kwargs }, false, 10).yellow,
              )
            } catch (error) {
              console.error(
                `Error: ${
                  error instanceof Error ? error.message : String(error)
                }`.red,
              )
            } finally {
              this.displayPrompt()
            }
          },
        )
      })
    },
  })

  replServer.defineCommand('REG', {
    help: 'Register a RPC endpoint.',
    async action(procedure) {
      if (!procedure) {
        console.error('Usage: . <procedure>'.red)
        this.displayPrompt()
        return
      }

      try {
        await session.register(procedure.trim(), (args, kwargs) => {
          process.stdout.write('\r')
          console.info(
            'CALL>'.cyan,
            `${procedure}>`.yellow,
            inspect({ args, kwargs }, false, 10),
          )
          this.displayPrompt()
        })
        console.info('Register a', procedure.green, 'endpoint')
      } catch (error) {
        console.error(
          `Error: ${error instanceof Error ? error.message : String(error)}`
            .red,
        )
      } finally {
        this.displayPrompt()
      }
    },
  })

  replServer.defineCommand('CALL', {
    help: 'Call a RPC endpoint',
    async action(procedure) {
      if (!procedure) {
        console.error('Usage: .CALL <procedure>'.red)
        this.displayPrompt()
        return
      }

      this.question('Enter args (YAML array)> '.magenta, (argsInput) => {
        this.question(
          'Enter kwargs (YAML object)> '.magenta,
          async (kwargsInput) => {
            try {
              const args = argsInput.trim() ? YAML.parse(argsInput) : []
              const kwargs = kwargsInput.trim() ? YAML.parse(kwargsInput) : {}

              const response = await session.call(
                procedure.trim(),
                args,
                kwargs,
              )

              console.info(
                'Called',
                procedure.green,
                inspect({ args, kwargs }, false, 10).yellow,
              )

              console.info('RES>'.cyan, response)
            } catch (error) {
              console.error(
                `Error: ${
                  error instanceof Error ? error.message : String(error)
                }`.red,
              )
            } finally {
              this.displayPrompt()
            }
          },
        )
      })
    },
  })

  replServer.on('reset', reset)

  reset()

  function reset() {
    Object.assign(replServer.context, { connection, session })
    replServer.once('exit', () => connection.close())
  }
}
