const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config({ path: './config.env' });
require('./db/conn');
const User = require('./model/userSchema');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended:true
// }))

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

// we link the router file to make our route easy 
app.use(require('./router/auth'));

const PORT = process.env.PORT;


// middleware
// const middleware = (req, res, next) => {
//     console.log('middleware');
//     next();
// }

// middleware();

// app.get('/', (req, res) => {
//     res.send('<h1>Home</h1>');
// })

// app.get('/about', middleware, (req, res) => {
//     console.log('about');
//     res.send('<h1>About</h1>');
// })

// app.get('/contact', (req, res) => {
//     res.send('<h1>Contat</h1>');
// })

// app.get('/join', (req, res) => {
//     res.send('<h1>Join</h1>');
// })

// app.get('/create', (req, res) => {
//     res.send('<h1>Create</h1>');
// })

app.listen(PORT, (err) => {
    console.log(`Server is listening to port ${PORT}`);
})