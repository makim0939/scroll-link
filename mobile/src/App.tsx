import React, {useEffect, useState } from 'react'
import {io} from 'socket.io-client'

import './App.css'

function App() {

  console.log(window.scrollY)
  useEffect(() => {
    
    const socket = io('http://10.14.1.137:3000')
    socket.on('connect', () => {
      console.log('User connected')
    })
    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
    const scrollHandler = (e:Event) =>{
      console.log(window.scrollY)
      socket.emit('scroll', window.scrollY)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.disconnect()
      window.removeEventListener('scroll', scrollHandler)
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
