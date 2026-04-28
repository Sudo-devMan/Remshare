
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Share1 from './pages/Share1'
import Share2 from './pages/Share2'

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='share' element={<Share1/>} />
        <Route path='share/prepare-files' element={<Share2/>} />
      </Routes>
    </div>
  )
}

export default App

