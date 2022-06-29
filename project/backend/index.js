const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const cors = require("cors")
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const directory = path.join('/', 'usr', 'src', 'app', 'project-files')
const filePath = path.join(directory, 'image.jpg')

app.use(cors())

app.use('/api/hello', express.static('public'))

app.use(express.static('build'))

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async () => {
  if (await fileAlreadyExists()) return
  
  try {
    await new Promise(res => fs.mkdir(directory, (err) => res()))
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
  } catch(error) {
    console.log(error)
  }
}

const findNew = async () => {
  try {
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
  } catch(error) {
    console.log(error)
  }
}

let day = Date().substr(0, 2)

findAFile()

app.get('/api/hello', (req, res) => {
  res.render('index')
})

app.get('/api/image', async (req, res) => {
  const today = Date().substr(0, 2)
  if (day !== today) {
    try {
    await findNew()
    } catch(error) {
      console.log(error)
    }
    day = today
    res.sendFile(filePath)
  } else {
    res.sendFile(filePath)
  }
})
  
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
