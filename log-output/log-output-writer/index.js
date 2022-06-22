const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
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

async function writeTimestamp() {
  try {
    await fs.writeFile(filePath, Date())
  } catch (err) {
    console.log(err);
  }
  setTimeout(writeTimestamp, 5000)
}

findAFile()
writeTimestamp()
  
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})

