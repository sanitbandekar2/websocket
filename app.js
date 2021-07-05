// const { Socket } = require('dgram');
// const express = require('express')
// const app = express()
// const path = require('path');
// const PORT = process.env.PORT || 4000
// // const http = require('http');
// // const server = http.createServer(express);
// const server = app.listen(PORT,()=>console.log(`server port ${PORT}`))
// const io = require('socket.io')(server);

// // app.use(express.static(path.join(__dirname,'public')))

// // let socketConnected = new Set()

// // io.on('')

// // io.on('connection',onConnect)

// function onConnect(socket) {
//     console.log(socket.id)
//     socketConnected.add(socket.id)
    
//     io.emit('client-total', socketConnected.size+PORT)


//     socket.on('disconnect',()=>{
//         console.log(socket.id)
//         socketConnected.delete(socket.id)
//         io.emit('client-total', socketConnected.size)
//     })

//     socket.on('message',(data) =>{
//         console.log(data);
//         socket.broadcast.emit('chat-msg',data)
//     })
    
// }


// const SocketServer = require('websocket').server
// const http = require('http')

// const server = http.createServer((req, res) => {})

// server.listen(4000, ()=>{
//     console.log("Listening on port 4000...")
// })

// wsServer = new SocketServer({httpServer:server})

// const connections = []

// wsServer.on('request', (req) => {
//     const connection = req.accept()
//     console.log('new connection')
//     connections.push(connection)

//     connection.on('message', (mes) => {
//         connections.forEach(element => {
//             if (element != connection)
//                 element.sendUTF(mes.utf8Data)
//         })
//     })

//     connection.on('close', (resCode, des) => {
//         console.log('connection closed')
//         connections.splice(connections.indexOf(connection), 1)
//     })

// })



// const WebSocket = require('ws')
 
// const wss = new WebSocket.Server({ port: 4000 })
 
// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('Hello! Message From Server!!')
// })



// const SocketServer = require('ws').Server;
// var express = require('express');
// var path = require('path');
// //init Express
// var app = express();
// //init Express Router
// var router = express.Router();
// var port = process.env.PORT || 4000;
// // var admin = path.join(__dirname, '/admin/adminPage.html');
// app.use(express.static(path.join(__dirname,'public')))

// app.get('/', function(req, res) {
//     // res.sendFile(path.join(__dirname + 'public'));
    
// });
// app.get('/admin', function(req, res) {
//     res.sendFile(admin);
// });
// var server = app.listen(port, function () {
//     //listening
// })
// const wss = new SocketServer({ server });

// let socketConnected = new Set()

// wss.on('connection', function connection(wss) {
//     console.log("connection ...");

//     console.log(wss)
//         // socketConnected.add(socket.id)
        
//         // wss.emit('client-total', socketConnected.size)

    
//         // socket.on('disconnect',()=>{
//         //     console.log(socket.id)
//         //     // socketConnected.delete(socket.id)
//         //     // wss.emit('client-total', socketConnected.size)
//         // })
    
//         // socket.on('message',(data) =>{
//         //     console.log(data);
            
//         //     // socket.broadcast.emit('chat-msg',data)
//         // })
// });


// setInterval(() => {
//     wss.clients.forEach((client) => {
//       client.send(new Date().toTimeString());
//     });
//   }, 1000);


// const express = require('express');
// const port = 4000;
// const WebSocket = require('ws');

// const http = require('http');
// const server = http.createServer(express);
// const wss = new WebSocket.Server({ server })

// wss.on('connection', function connection(ws) {

//   ws.on('message', function incoming(data) {
    
//       console.log(data);
//       wss.clients.forEach(function each(client) {
//           if (client !== ws && client.readyState === WebSocket.OPEN) {
//               client.send(data.anchor);
//             }
//     })
//   })
// })

// server.listen(port, function() {
//   console.log(`Server is listening on ${port}!`)
// })


  
// var app = require("express")();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);

// const port = 4000;

// // app.get("/", function(req, res) {
// //   res.sendFile(__dirname + "/index.html");
// // });

// io.on("connection", function(socket) {
//   console.log("a user connected");

//   socket.on("join_room", room => {
//     socket.join(room);
//   });

//   socket.on("message", ({ room, message }) => {
//     socket.to(room).emit("message", {
//       message,
//       name: "Friend"
//     });
//   });

//   socket.on("typing", ({ room }) => {
//     socket.to(room).emit("typing", "Someone is typing");
//   });

//   socket.on("stopped_tying", ({ room }) => {
//     socket.to(room).emit("stopped_tying");
//   });
// });

// http.listen(port, function() {
//   console.log(`listening on *:${port}`);
// });

// ----------------------------------------------------------------------------------
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

const order = require('./Routes/orders.route')
app.use('/orders',order)

var WebSocketServer = require('websocket').server;
var http = require('http');

app.use(express.json())

var server = http.createServer(app);



app.get('/',(req,res,next)=>{
    console.log(req.url);
    console.log(req.method);
    res.send("home route")
})
app.post('/',(req,res,next)=>{
    console.log("body",req.body);
    // console.log(req.method);
    const id =JSON.stringify(req.body);
  console.log("id",id);
        const obj = JSON.parse(id);
        console.log(obj.id);
        sendToConnectionId(obj.id,id)

    res.send(req.body)
})

app.get('/:id',(req,res,next)=>{
        const id =req.params.id;
        console.log(id);
        res.send(id)
        const obj = JSON.parse(id);
    
          sendToConnectionId(obj.id,id)

})




wsServer = new WebSocketServer({ httpServer: server});

function originIsAllowed(origin) {
// put logic here to detect whether the specified origin is allowed.
return true;
}

var connections = {};
var connectionIDCounter = 0;

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  
  var connection = request.accept(null, request.origin);

  let socketConnected = new Set()
  var idArray = request.resourceURL.pathname.split("/");
  console.log(idArray[1]);
  
  // Store a reference to the connection using an incrementing ID
  connection.id = idArray[1];
  // connection.id = connectionIDCounter ++;
  connections[connection.id] = connection;
  console.log(connection.id);
  
  // Now you can access the connection with connections[id] and find out
  // the id for a connection with connection.id
  
  console.log((new Date()) + ' Connection ID ' + connection.id + ' accepted.');


    

  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected. ' +
                  "Connection ID: " + connection.id);
      
      // Make sure to remove closed connections from the global pool
      delete connections[connection.id];
  });
});

// Broadcast to all open connections
function broadcast(data) {
  Object.keys(connections).forEach(function(key) {
      var connection = connections[key];
      if (connection.connected) {
          connection.send(data);
      }
  });
}

// Send a message to a connection by its connectionID
function sendToConnectionId(connectionID, data) {
  var connection = connections[connectionID];
  if (connection && connection.connected) {
      connection.send(data);
  }
}

server.listen(PORT, function() {
  console.log((new Date()) + ' Server is listening on port 5000');
});

// -----------------------------------------------------------------------------------------------


// var webSocketServer = new (require('ws')).Server({port: (process.env.PORT || 5000)}),
//     webSockets = {} // userID: webSocket

// // CONNECT /:userID
// // wscat -c ws://localhost:5000/1
// webSocketServer.on('connection', function (webSocket) {
//   console.log(webSocket)
//   var userID = 100
//   webSockets[userID] = webSocket
//   console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(webSockets))

//   // Forward Message
//   //
//   // Receive               Example
//   // [toUserID, text]      [2, "Hello, World!"]
//   //
//   // Send                  Example
//   // [fromUserID, text]    [1, "Hello, World!"]
//   webSocket.on('message', function(message) {
//     console.log('received from ' + userID + ': ' + message)
//     var messageArray = JSON.parse(message)
//     var toUserWebSocket = webSockets[messageArray[0]]
//     if (toUserWebSocket) {
//       console.log('sent to ' + messageArray[0] + ': ' + JSON.stringify(messageArray))
//       messageArray[0] = userID
//       toUserWebSocket.send(JSON.stringify(messageArray))
//     }
//   })

//   webSocket.on('close', function () {
//     delete webSockets[userID]
//     console.log('deleted: ' + userID)
//   })
// })