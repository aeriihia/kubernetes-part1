import React, { useState, useEffect } from 'react';

function App() {
  const [image, setImage] = useState(null)
  
  const fetchImage = async () => {
    try {
      const res = await fetch('/api/image')
      const imageBlob = await res.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob)
      setImage(imageObjectURL)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div>
      {image && <img src={image} height={300} width={300} alt="picsum" />}
      <p>Hello frontend</p>
    </div>
  )
}

export default App
