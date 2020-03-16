import canvas from './canvas.js'
import User from './user.js'

class Player extends User {
   constructor(){
      super()
      this.element = canvas.create('div', {'class': ['player', 'user']})
      this.initMovement()
   }
   set(key,value){
      this[key] = value
   }
   initMovement(){
      const keycodes = [37,38,39,40]
      window.addEventListener('keydown', (key) => {
         if(key.keyCode === 38){
            this.move('y', -1)
         }
         if(key.keyCode === 40){
            this.move('y', 1)
         }
         if(key.keyCode === 37){
            this.move('x', -1)
         }
         if(key.keyCode === 39){
            this.move('x', 1)
         }
         if(keycodes.includes(key.keyCode)){
            this.socket.emit('user-move', this.coordinates)
         }
      })
   }
}

const player = new Player()

export default player