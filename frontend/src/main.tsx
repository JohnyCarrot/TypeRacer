import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(   
    <React.StrictMode>
        <BrowserRouter>
            <div className="min-h-screen bg-linear-to-b from-sky-800 to-gray-200">
                <App />
            </div>
        </BrowserRouter>
    </React.StrictMode>
)