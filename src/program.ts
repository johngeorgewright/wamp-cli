#!/usr/bin/env node

import autobahn from 'autobahn'
import pkg from '../package.json'
import program from 'commander'
import * as repl from './repl'
import 'colors'

program
  .version(pkg.version)
  .arguments('<url> <realm>')
  .action(start)
  .parse(process.argv)

function start(url: string, realm: string) {
  const connection = new autobahn.Connection({ url, realm })
  connection.onopen = repl.start(connection)
  console.info(`Connecting to ${url} ${realm}`.italic.yellow)
  connection.open()
}
