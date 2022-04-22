const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Carol Jones')
})

app.listen(port, () => {
  console.log(`This app is running on port
   ${port}`)
})