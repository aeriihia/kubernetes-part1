const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs/promises')
const path = require('path')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath1 = path.join(directory, 'timestamp.txt')
const filePath2 = path.join(directory, 'pingpong.txt')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath1, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
  fs.stat(filePath2, (err, stats) => {
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
let pingpongs = ''

async function readTimestamp() {
  try {
    const timestamp = await fs.readFile(filePath1)
    timestamp_hash = timestamp + ' ' + hash
    console.log(timestamp_hash)
  } catch (err) {
    console.log(err)
  }
  setTimeout(readTimestamp, 5000)
}

async function readPingPongs() {
  try {
    pingpongs = await fs.readFile(filePath2)
    console.log(pingpongs)
  } catch (err) {
    console.log(err)
  }
  setTimeout(readPingPongs, 5000)
}

findAFile()
readTimestamp()
readPingPongs()

app.get('/', (req, res) => {
  res.send(`<html>${timestamp_hash}<br/>${pingpongs}</html>`)
})
  
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

