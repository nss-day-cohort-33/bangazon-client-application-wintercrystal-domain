import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import BangazonBuilder from './components/bangazon.js'
import './index.css'

ReactDOM.render(
  <Router>
      <BangazonBuilder />
  </Router>
  , document.getElementById('root'))