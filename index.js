const express = require('express')
const cookieSession = require('cookie-session');

const app = express()
const PORT = 3001

const roomRoutes = require('./router/rooms');
const hostRoutes = require('./router/hosts');
// const commentRoutes = require('./router/comments');

app.use(express.json())
//allow express accept incoming requests with JSON payloads

//use cors would also be ok
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //3000 port is for react app, this enables the data communication between them
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: "this is a secret cookie key"
    })
);

app.use("/rooms", roomRoutes);
app.use("/hosts", hostRoutes);
// app.use("/rooms/:id/comments", commentRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log('postgre app runs!')
})