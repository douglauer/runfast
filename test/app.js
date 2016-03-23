'use strict'

let _ = require('lodash')
 , app = require('express')()

app.get('/', (req,res,next) => {
  res.json({pong:(new Date().getTime())})
})

app.get('/throw',(req,res,next) => {
  throw new Error('Generic error')
})

app.listen(8090)
console.log(':8090')

