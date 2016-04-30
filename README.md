WAMP CLI
===

> A CLI tool to help building applications with the Web Applications Messaging Protocol

Installation
---

1. Install Node.js
1. `npm i -g wamp-cli`

Useage
---

```
# URL -> REALM
wampc ws://localhost:9000/ws public

? -> call com.site.registered.call {'arg':'blah'}
{'some': 'kind of result'}
```
