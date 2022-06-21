const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs/promises')
const path = require('path')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamp.txt')

async function writeTimestamp() {
  try {
    await fs.writeFile(filePath, Date())
  } catch (err) {
    console.log(err);
  }
  setTimeout(writeTimestamp, 5000)
}

writeTimestamp()
  
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

