const connecttoMongo=require('./db')
connecttoMongo();
var cors = require('cors')



const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,() =>{
  console.log(`Example app listening on port ${port}`)})