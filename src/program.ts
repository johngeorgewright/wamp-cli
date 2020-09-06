#!/usr/bin/env node

import autobahn from 'autobahn'
import pkg from '../package.json'
import program from 'commander'
import * as repl from './repl'
import 'colors'

function start(url: string, realm: string) {
  let connection = new autobahn.Connection({ url, realm })
  connection.onopen = repl.start(connection)
  connection.onclose = (reason, details) => {
    console.error('Connection lost'.red)
    console.error(reason)
    console.error(details)
    return false
  }
  console.log(`Connecting to ${url} ${realm}`.italic.yellow)
  connection.open()
}

program
  .version(pkg.version)
  .arguments('<url> <realm>')
  .action(start)
  .parse(process.argv)
