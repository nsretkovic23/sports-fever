const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
app.use(cors())
app.use(router)

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) return callback(error)
    socket.join(user.room)
    console.log('joined to room')
    callback()
  })

  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);
    console.log("send")
    io.to(user.room).emit('message', {...message});
  
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
  })
})

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
)
