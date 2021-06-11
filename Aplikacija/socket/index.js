// const users = []

// const io = require('socket.io')(8900, {
//   cors: {
//     origin: '*',
//   },
// })

// io.on('connection', (socket) => {
//   console.log('user connected')

//   socket.on('joinRoom', ({ userID, conversationId }) => {
//     const socketID = socket.id
//     const user = { socketID, userID, conversationId }
//     users.push(user)
//     socket.join(user.room)
//     console.log('------------')
//     console.log(users)
//   })
//   socket.on('sendMessage', ({ conversationId, senderId, senderName, text }) => {
//     const user = users.find((user) => user.socketID === socket.id)
//     console.log('GOT MESSAGE')
//     console.log(user)
//     io.to(user.conversationId).emit('getMessage', {
//       conversationId,
//       senderId,
//       senderName,
//       text,
//     })
//   })
//   socket.on('disconnect', () => {
//     const index = users.findIndex((user) => user.socketID === socket.id)
//     if (index !== -1) {
//       users.splice(index, 1)[0]
//     }
//   })
// })

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
    // socket.emit('message', {
    //   user: 'admin',
    //   text: `${user.name}, welcome to room ${user.room}.`,
    // })
    // socket.broadcast
    //   .to(user.room)
    //   .emit('message', { user: 'admin', text: `${user.name} has joined!` })

    // io.to(user.room).emit('roomData', {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', message);
    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    // if (user) {
    //   io.to(user.room).emit('message', {
    //     user: 'Admin',
    //     text: `${user.name} has left.`,
    //   })
    //   io.to(user.room).emit('roomData', {
    //     room: user.room,
    //     users: getUsersInRoom(user.room),
    //   })
    // }
  })
})

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
)
