
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Share1 from './pages/Share1'
import Share2 from './pages/Share2'
import ReceiveForm from './pages/ReceiveForm'
import ReceivedFiles from './pages/ReceivedFiles'
import Paused from './pages/Paused'
import { ReceiveProvider, ShareProvider } from './context'
import Nah from './pages/nah'

function App() {
  return (
    <ShareProvider>
      <ReceiveProvider>
        <div>
          {
            import.meta.env.VITE_BRUH_MODE === 'live' ?
              <Routes>
                <Route path='*' element={<Nah/>} />
                <Route index element={<Home/>}/>
                <Route path='share' element={<Share1/>} />
                <Route path='share/prepare-files' element={<Share2/>} />
                <Route path='receive' element={<ReceiveForm/>} />
                <Route path='received-files' element={<ReceivedFiles/>} />
              </Routes>
              :
              <Routes>
                <Route path="*" element={<Nah/>} />
                <Route index element={<Paused/>} />
              </Routes>
          }
        </div>
      </ReceiveProvider>
    </ShareProvider>
    
  )
}

export default App

