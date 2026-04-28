
import React from 'react'
import Register from './pages/Register'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import HomePage from './pages/HomePage'; 
import Profile from './pages/Profile';
import Layout from './Layout/Layout';



function App() {
  


  return (
   <Router>
    <Routes> 
       <Route path="/" element={<Login />} />
       <Route path="/login" element={<Login />} />
      <Route path="/Register" element={ <Register  />} />
        {/* protected routes */}
      <Route path="/HomePage" element={<Layout><HomePage /></Layout>} />
       <Route path="/profile/:id" element={ <Layout><Profile /></Layout>} />
    </Routes>
   
   </Router>
  )
}

export default App
