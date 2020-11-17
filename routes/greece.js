const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.send('Home')
})

router.get('/socials', function(req, res) {
    res.send('Socials here')
})

router.get('/posts', function(req, res) {
    if(!err) return res.status(203).send('We Have An Error...')
    const posts = require('../posts/greekposts')
    if(!posts) return res.status(404).send('we have an error')
    return res.send(posts)
})

router.get('/posts/:name', function(req, res) {
    res.send('Post Name' + req.params.name)
})

module.exports = router;