import { rejects } from 'assert';
import { resolve } from 'path';
import App from './App'
import config from './config/config'


const app = new App(config.server.port, config.mongo.dbUrl)
app.listen()


// declare a route with a response
// app.get('/api', )

// // start the server
