import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import AddTask from './pages/AddTask'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add-task" element={<AddTask/>}/>
            <Route path="/tasks/:status" element={<Home/>}/>
            <Route/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
