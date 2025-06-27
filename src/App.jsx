import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/organisms/Header'
import WorldMap from '@/components/pages/WorldMap'
import MathWorld from '@/components/pages/MathWorld'
import ReadingWorld from '@/components/pages/ReadingWorld'
import AvatarShop from '@/components/pages/AvatarShop'
import Progress from '@/components/pages/Progress'
import Achievements from '@/components/pages/Achievements'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-pink-50">
      <Header />
      <main className="pb-20">
        <Routes>
          <Route path="/" element={<WorldMap />} />
          <Route path="/math" element={<MathWorld />} />
          <Route path="/reading" element={<ReadingWorld />} />
          <Route path="/shop" element={<AvatarShop />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </main>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App