const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3000

app.use(cors())

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
