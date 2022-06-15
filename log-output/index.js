const hash = Math.random().toString(36).substr(2, 6)

const printHash = () => {
  console.log(Date() + ' ' + hash)
  setTimeout(printHash, 5000)
}

printHash()
