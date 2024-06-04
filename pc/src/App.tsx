import { useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  
useEffect(() => {
  const socket = io('http://localhost:3000')
  socket.on('connect', () => {
    console.log('User connected')
  })
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
  socket.on('scroll', (scrollY) => {
    console.log(scrollY)
    window.scrollTo(0, scrollY)
  })

  return () => {
    socket.off('connect')
    socket.off('disconnect')
    socket.disconnect()
  
  }
}, [])

  return (
    <>
      <div style={{height:"100vh"}}>a</div>
    <div style={{height:"100vh"}}>b</div>
    <div style={{height:"100vh"}}>c</div>
    <div style={{height:"100vh"}}>d</div>
    </>
  )
}

export default App
