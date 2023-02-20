const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const sessions = {}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))

// auth middleware
const applyAuthMiddleware = (req, res, next) => {
    if(!req.headers.cookie) {
        next();
    } else {
        res.status(401).send({message: 'Invalid Request'})
    }
} 

app.get('/', applyAuthMiddleware, (req, res, next) => {  
    res.sendFile(path.join(__dirname, '/views/html/login.html'))
}) 

app.get('/profile', applyAuthMiddleware, (req, res, next) => {
    res.sendFile(path.join(__dirname, '/views/html/index.html'))
})

app.post('/login', (req, res, next) => {
    const {email, password} = req.body
    if(email === 'admin@gmail.com' && password === 'admin') {
        const sessionId = Math.floor(Math.random() * 100000)
        res.set('Set-Cookie', sessionId)
        sessions[sessionId] = { username: 'Admin', userId: 1 }
        res.status(200).send({
            userId: 1,
            success: 'ok',
            message: 'user logged in'
        })
    } else {
        res.status(401).send({
            message: 'Invalid email or password'
        })
    }
})

app.get('/logout', (req, res, next) => {
    const sessionId = req.headers.cookie
    delete sessions[sessionId]
    res.set('Set-Cookie', null)
    res.status(200).send({
        message: 'Logged out successfully'
    })
})

app.listen(8000, ()=>{
    console.log("Server is running at port no 8000...")
});