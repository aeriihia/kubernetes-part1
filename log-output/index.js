const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

const hash = Math.random().toString(36).substr(2, 6)

const printHash = () => {
  console.log(Date() + ' ' + hash)
  setTimeout(printHash, 5000)
}

printHash()

app.get('/', (req, res) => {
  res.send(Date() + ' ' + hash)
})
  
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

