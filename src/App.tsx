
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Share1 from './pages/Share1'
import Share2 from './pages/Share2'
import ReceiveForm from './pages/ReceiveForm'
import ReceivedFiles from './pages/ReceivedFiles'
import Paused from './pages/Paused'
import { ShareProvider } from './context'

function App() {
  return (
    <ShareProvider>
      <div>
      <Routes>
        <Route index element={import.meta.env.VITE_BRUH_MODE === 'live' ? <Home/> : <Paused/>}/>
        <Route path='share' element={<Share1/>} />
        <Route path='share/prepare-files' element={<Share2/>} />
        <Route path='receive' element={<ReceiveForm/>} />
        <Route path='received-files' element={<ReceivedFiles/>} />
      </Routes>
    </div>
    </ShareProvider>
    
  )
}

export default App

