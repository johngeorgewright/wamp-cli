WAMP CLI
===

[![Greenkeeper badge](https://badges.greenkeeper.io/johngeorgewright/wamp-cli.svg)](https://greenkeeper.io/)

> A CLI tool to help building applications with the Web Applications Messaging Protocol

Installation
---

1. Install Node.js
1. `npm i -g wamp-cli`

Usage
---

```
# URL -> REALM
$> wampc ws://localhost:9000/ws public

Connecting to ws://localhost:9000/ws internal

Connected

┌────────────┬─────────────────────┐
│ Variable   │ Description         │
├────────────┼─────────────────────┤
│ connection │ The WAMP connection │
├────────────┼─────────────────────┤
│ session    │ The WAMP session    │
└────────────┴─────────────────────┘

$>
```
