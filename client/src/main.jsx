import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NavBar from './components/navbar/NavBar.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <NavBar/>
    <App />
    <Toaster closeButton />

  </Provider>

  </>
    
)
