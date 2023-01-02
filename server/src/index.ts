import { rejects } from 'assert';
import { resolve } from 'path';
import App from './App'
import config from './config/config'


const app = new App(config.server.port, config.mongo.dbUrl)
app.listen()


// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });

// declare a route with a response
// app.get('/api', )

// // start the server
const t = App.testStr
