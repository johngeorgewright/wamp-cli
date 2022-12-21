WAMP CLI
===

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

Connecting to ws://localhost:9000/ws public

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
