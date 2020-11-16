const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
const AuthRoute = require('./routes/auth.js')
const path = require('path')

app.use('/auth', AuthRoute)

app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }))
 

app.use(bodyParser.json())


app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.use(passport.initialize());
app.use(passport.session());


app.get('/home', isLoggedIn, (req, res) => res.send(`Welcome my g!`))

app.get('/', function(req, res) {
  res.send('hello word')
})

app.listen(3000, () => console.log(`Server Listening On Port ${3000}!`))