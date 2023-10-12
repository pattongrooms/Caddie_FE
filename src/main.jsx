import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

createRoot(document.querySelector('#root')).render(
  <Router>
    <App />
  </Router>
)
