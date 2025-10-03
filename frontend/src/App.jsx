import { useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import RefreshHandle from './utils/refresh'
import React from "react" 

function App() {

  return (
      <div className='App'>
        <RefreshHandle/>
        <Routes>
           <Route path='/' element={<Navigate to='/login'/>} />        
           <Route path='/login' element={<Login/>} />        
           <Route path='/home' element={<Home/>} />  
           <Route path='/signup' element={<Signup/>} />  
                 
        </Routes>

      </div>
  )
}

export default App
