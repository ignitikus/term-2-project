import player from '../modules/player.js'
import User from '../modules/user.js'

const users = []

const socket = io()

player.set('socket', socket)

const getIndex = (id) => {
   return users.findIndex(user => user.id ===id)
}


socket.emit('user-connected', (onlineUsers) => {
   onlineUsers.forEach((user) => {
      const id = user.id
      const instance = new User(id)
      instance.setPosition(user.coordinates)
      users.push({id, instance})
   })
})

socket.on('user-connected', (id) => {
   if(id === socket.id) return 
   const user = new User()
   users.push({id, instance: user})
})

socket.on('user-disconnected', (id) => {
   document.querySelector(`[data-id="${id}"]`).remove()
   users.splice(1,index)
})

socket.on('user-move', (user) => {
   console.log(users)
   const index = getIndex(user.id)
   const instance = users[index].instance
   instance.setPosition(user.coordinates)
})