const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require("../server.js")
require("../auth/google.js")
require("../auth/discord")


router.use(cors())


router.use(bodyParser.urlencoded({ extended: false }))
 

router.use(bodyParser.json())


router.use(cookieSession({
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

router.use(passport.initialize());
router.use(passport.session());


router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {

    res.redirect('/home');
  }
);

router.get('/discord', passport.authenticate('discord', { scope: ["identify"] }))

router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/failed'}),
  function(req, res) {
      
    res.redirect('/home')
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/')
})

module.exports = router;