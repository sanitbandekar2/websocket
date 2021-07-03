const { Socket } = require('dgram');
const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 4000
const server = app.listen(PORT,()=>console.log(`server port ${PORT}`))
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')))

let socketConnected = new Set()

io.on('connection',onConnect)

function onConnect(socket) {
    console.log(socket.id)
    socketConnected.add(socket.id)
    
    io.emit('client-total', socketConnected.size+PORT)


    socket.on('disconnect',()=>{
        console.log(socket.id)
        socketConnected.delete(socket.id)
        io.emit('client-total', socketConnected.size)
    })

    socket.on('message',(data) =>{
        console.log(data);
        socket.broadcast.emit('chat-msg',data)
    })
}


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