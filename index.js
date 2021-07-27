const express = require('express')
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const app = express()
const PORT = 3001

require('./services/passport');

const roomRoutes = require('./router/rooms');
const imageRoutes = require('./router/images');
const authRoutes = require('./router/auth');
// const commentRoutes = require('./router/comments');

app.use(express.json())
//allow express accept incoming requests with JSON payloads

//use cors would also be ok
//3000 port is for react app, this enables the data communication between them
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: keys.cookiekey
    })
);

//tell passport to use cookie for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/images", imageRoutes);
// app.use("/rooms/:id/comments", commentRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log('postgre app runs!')
})