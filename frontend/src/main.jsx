import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RecoilRoot>
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
    </RecoilRoot>
    </AuthContextProvider>
   
    
  </React.StrictMode>,
)
