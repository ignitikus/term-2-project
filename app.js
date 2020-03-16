const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req,res,next) => {
  res.io = io
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const users = []

const getIndex = (id) => {
  return users.findIndex((user) => user.id ===id)
}


io.on('connection', (socket) => {
  socket.on('user-connected', cb => {
    cb(users)
    users.push({id: socket.id})
    io.emit('user-connected', socket.id)
  })
  socket.on('disconnect', () => {
    const index = getIndex(socket.id)
    users.splice(1, index)
    io.emit('user-disconnected', socket.id)
  })
  socket.on('user-move', (coordinates) => {
    const index = getIndex(socket.id)
    users[index].coordinates = coordinates
    io.emit('user-move', {id:socket.id, coordinates})
  })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app, server, io};
