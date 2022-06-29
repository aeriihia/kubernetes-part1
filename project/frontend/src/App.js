import React, { useState, useEffect } from 'react';
import './App.css';

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
  
  const todos = [{ "id":1, "content":"TODO 1" }, { "id":2, "content":"TODO 2" }]
  
  const addToDo = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      {image && <img src={image} height={300} width={300} alt="picsum" />}
      <form onSubmit={addToDo}>
        <input maxlength="140" />
        <button type="submit">Create TODO</button>
      </form>
      <ul>
        {todos.map(todo => 
          <li key={todo.id}>{todo.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App
