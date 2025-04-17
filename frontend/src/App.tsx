// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import Singleplayer from './pages/singleplayer'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />


            {/* 404 fallback */}
            <Route path="*" element={<div>404 - stránka neexistuje</div>} />
        </Routes>
    )
}

export default App
