const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs/promises')
const path = require('path')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamp.txt')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async () => {
  if (await fileAlreadyExists()) return
  await new Promise(res => fs.mkdir(directory, (err) => res()))
}

const hash = Math.random().toString(36).substr(2, 6)

let timestamp_hash = ''

async function readTimestamp() {
  try {
    const timestamp = await fs.readFile(filePath)
    timestamp_hash = timestamp + ' ' + hash
    console.log(timestamp_hash)
  } catch (err) {
    console.log(err)
  }
  setTimeout(readTimestamp, 5000)
}

findAFile()
readTimestamp()

app.get('/', (req, res) => {
  res.send(timestamp_hash)
})
  
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

