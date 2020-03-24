

$(function () {
   const socket = io();
   socket.on('userConnected', (msg) => {
      $('#messages').append($('<li>').text(`Server Message: ${msg}`));
   })
   $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      let msg = $('#m').val()
      let username = document.getElementById('username').innerHTML
      socket.emit('chat message', {msg, username});
      $('#m').val('');
      return false;
   });
   socket.on('chat message', ({msg, id})=>{
      console.log(socket)
      $('#messages').append($('<li>').text(`${id}: ${msg}`));
   });
});