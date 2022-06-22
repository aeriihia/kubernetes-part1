const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs/promises')
const path = require('path')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.txt')

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

findAFile()

let counter = 0

async function writePingPongs() {
  try {
    await fs.writeFile(filePath, 'Ping / Pongs: ' + counter)
  } catch (err) {
    console.log(err);
  }
}

app.get('/pingpong', (req, res) => {
  counter = counter + 1
  writePingPongs()
  res.send('pong ' + counter)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
