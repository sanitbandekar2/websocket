const express = require('express');
const app = express.Router();

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(app);



app.get('/',(req,res,next)=>{
    console.log(req.url);
    console.log(req.method);
    res.send("home route")
})
app.post('/',(req,res,next)=>{
    console.log("post");
    // console.log(req.method);
    // res.send("home route")
})

app.get('/:id',(req,res,next)=>{
        const id =req.params.id;
        console.log(id);
        res.send(id)
        const obj = JSON.parse(id);
    
          sendToConnectionId(obj.id,id)

})




wsServer = new WebSocketServer({ httpServer: server,path:"orders"});

function originIsAllowed(origin) {
// put logic here to detect whether the specified origin is allowed.
console.log("origin"+origin);
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

module.exports = app;