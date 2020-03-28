$(function () {
   const socket = io();
   socket.on('userConnected', (msg) => {
      $('#messages').append($('<li>').text(`Server Message: ${msg}`));
   })
   $('#chat-form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      let msg = $('#m').val()
      let username = document.getElementById('username').innerHTML
      let avatar = document.getElementById('avatar').innerHTML
      socket.emit('chat message', {msg, username, avatar});
      $('#m').val('');
      return false;
   });
   socket.on('chat message', ({msg, id, avatar})=>{
      console.log(socket)
      $('#messages').append($('<div class="avatar">').append($(`<img src='${avatar}'><li>${id}: ${msg}</li>`)));
   });
});