import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import About from "./pages/About"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App;