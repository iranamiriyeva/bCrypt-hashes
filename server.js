'use strict'
const express     = require('express')
const bodyParser  = require('body-parser')
const fccTesting  = require('./freeCodeCamp/fcctesting.js')
const app         = express()
fccTesting(app)
const saltRounds = 12
const myPlaintextPassword = 'sUperpassw0rd!'
const someOtherPlaintextPassword = 'pass123'
//Solution1: Understand BCrypt Hashes
const bcrypt = require('bcrypt')

//START_ASYNC -do not remove notes, place code between correct pair of notes.
//Solution2: Hash and Compare Passwords Asynchronously
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log(hash)

    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      console.log(res) //true
    })

    bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
        console.log(res) //false
      })
  })
//END_ASYNC

//START_SYNC
//Solution3: Hash and Compare Passwords Synchronously
let hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)
console.log(hash)
let result = bcrypt.compareSync(myPlaintextPassword, hash)
console.log(result)
let invalidPassword = bcrypt.compareSync(someOtherPlaintextPassword, hash)
console.log(invalidPassword)
//END_SYNC


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
})