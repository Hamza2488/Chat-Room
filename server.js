const express = require("express")
const path = require("path")

const app = express();
const server = require("http").createServer(app);

const io =require("socket.io")(server)

app.use(express.static(path.join(__dirname+"/public")))

const hostname = '0.0.0.0'
const port = 5000

io.on("connection",function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username + " Joined the conversation")
    })

    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + " left the conversation")
    })

    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message)
    })
})

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`)
});
