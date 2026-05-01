
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Share1 from './pages/Share1'
import Share2 from './pages/Share2'
import ReceiveForm from './pages/ReceiveForm'
import ReceivedFiles from './pages/ReceivedFiles'

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='share' element={<Share1/>} />
        <Route path='share/prepare-files' element={<Share2/>} />
        <Route path='receive' element={<ReceiveForm/>} />
        <Route path='received-files' element={<ReceivedFiles/>} />
      </Routes>
    </div>
  )
}

export default App

