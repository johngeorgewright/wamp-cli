# WAMP CLI

> A CLI tool to help building applications with the Web Applications Messaging Protocol

## Usage

```
# URL -> REALM
$> npx -p wamp-cli wampc ws://localhost:9000/ws public

Connecting to ws://localhost:9000/ws public

Connected

┌───────────────────┬─────────────────────────┐
│ Command           │ Description             │
├───────────────────┼─────────────────────────┤
│ .SUB <topic>      │ Subscript to a topic    │
├───────────────────┼─────────────────────────┤
│ .PUB <topic>      │ Publish to a topic      │
├───────────────────┼─────────────────────────┤
│ .REG <procedure>  │ Register a RPC endpoint │
├───────────────────┼─────────────────────────┤
│ .CALL <procedure> │ Call a RPC endpoint     │
└───────────────────┴─────────────────────────┘

┌────────────┬─────────────────────┐
│ Variable   │ Description         │
├────────────┼─────────────────────┤
│ connection │ The WAMP connection │
├────────────┼─────────────────────┤
│ session    │ The WAMP session    │
└────────────┴─────────────────────┘

$>
```
