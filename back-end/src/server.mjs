#!/usr/bin/env node
import {getExpress} from "./app.mjs"


// const port = 3000

const app = getExpress()

// which port to listen for HTTP(S) requests
const port = process.env.SERVER_PORT

// call a function to start listening to the port
const listener = app.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

export default close;