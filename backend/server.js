import express from 'express'
import bodyParser from 'body-parser'
import DB from './DB'

const ObjectID = require('mongodb').ObjectID;
const app = express()
const PORT = 5000
const SECRET_NUMBER = 19
const MAX_ATTEMPTS = 3

const USERS_TABLE = 'users'
const CONNECTIONS_TABLE = 'connections'

const configure = () => {
  app.use(bodyParser.json())
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    if ('OPTIONS' === req.method) {
      res.send(200)
    }
    else {
      next()
    }
  });

  app.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const existingUser = await DB.find(USERS_TABLE, { username })
    if (existingUser.length > 0) {
      res.status(400)
      res.json({ message: 'Username already exists' })
      res.end()
      return
    }
    const response = await DB.insertOne(USERS_TABLE, { username, password })
    res.json(response)
    res.end()
  })

  app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const existingUser = await DB.find(USERS_TABLE, { username, password })
    if (existingUser.length === 0) {
      res.status(400)
      res.json({ message: 'Username/password did not match.' })
      res.end()
      return
    }
    const existingConnection = await DB.find(CONNECTIONS_TABLE, { username })
    if (existingConnection.length > 0) {
      res.json(existingConnection[0])
      res.end()
      return
    }
    const response = await DB.insertOne(CONNECTIONS_TABLE, {
      username,
      token: new ObjectID().toString(),
      attempts: MAX_ATTEMPTS,
    })
    res.json(response)
    res.end()
  })

  app.delete('/logout', async (req, res) => {
    const { token } = req.body
    const existingUser = await DB.find(CONNECTIONS_TABLE, { token })
    if (existingUser.length === 0) {
      res.status(400)
      res.json({ message: 'Token is not valid.' })
      res.end()
      return
    }
    const response = await DB.remove(CONNECTIONS_TABLE, { token })
    res.json(response)
    res.end()
  })

  app.post('/validateNumber', async (req, res) => {
    const { number, token } = req.body
    if (!number || number.length === 0 || number.length > 2) {
      res.status(400)
      res.json({ message: 'Number is not in specified range.' })
      res.end()
      return
    }
    const existingUsers = await DB.find(CONNECTIONS_TABLE, { token })
    if (existingUsers.length === 0) {
      res.status(400)
      res.json({ message: 'Not authorized.' })
      res.end()
      return
    }
    const existingUser = existingUsers[0]
    if (existingUser.attempts === 1) {
      res.status(400)
        res.json({ code: 'MAX_ATTEMPTS_REACHED', message: 'Maximum number of attempts reached.' })
      res.end()
      return
    }

    if (number == SECRET_NUMBER) {
      res.json({ success: true })
      res.end()
      return
    }
    await DB.updateOne(CONNECTIONS_TABLE, {_id: existingUser._id},
      { $inc: { attempts: -1 } })
    const userInfo = await DB.find(CONNECTIONS_TABLE, { _id: existingUser._id })
    res.json(userInfo[0])
    res.end()
  })

  app.listen(PORT, () => {
    console.log(`server started listening on port: ${PORT}`)
  })
}


DB.connectToDatabase().then(function () {
  configure();
}).catch(function (err) {
  console.log("Error in connecting to database : " + err);
});
