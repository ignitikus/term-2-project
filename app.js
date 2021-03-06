const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const methodOverride = require('method-override')

let MongoStore = require('connect-mongo')(session)
require('./lib/passport')
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/usersRoutes');
const adminRouter = require('./routes/admin/adminRoutes');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(flash())

app.use(session({
  resave:true,
  saveUninitialized:true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
      cookie: { maxAge: 6000}
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next) => {
  res.locals.user = req.user
  res.locals.errors = req.flash('errors')
  res.locals.errors2 = req.flash('errors2')
  res.locals.errors3 = req.flash('errors3')
  res.locals.message = req.flash('message')
  res.locals.success = req.flash('success')
  res.locals.success2 = req.flash('success2')
  next()
})

io.on('connection', (socket) => {
  socket.emit('userConnected', `Welcome to chatroom! Messages are not recorded. All messages before you joined will not be displayed. Current number of users in the chat: ${socket.server.engine.clientsCount}`)
  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  })
  socket.on('chat message',({msg, username, avatar})=>{
    io.emit('chat message', {msg, id: username, avatar});
  })
})


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter)

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
