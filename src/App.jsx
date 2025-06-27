import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/organisms/Header'
import WorldMap from '@/components/pages/WorldMap'
import MathWorld from '@/components/pages/MathWorld'
import ReadingWorld from '@/components/pages/ReadingWorld'
import AvatarShop from '@/components/pages/AvatarShop'
import Progress from '@/components/pages/Progress'
import ParentDashboard from '@/components/pages/ParentDashboard'
import Achievements from '@/components/pages/Achievements'
import Profile from '@/components/pages/Profile'
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-50 to-cyan-50">
      <Header />
<main className="pb-20">
        <Routes>
          <Route path="/" element={<WorldMap />} />
          <Route path="/math" element={<MathWorld />} />
          <Route path="/reading" element={<ReadingWorld />} />
<Route path="/shop" element={<AvatarShop />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/profile" element={<Profile />} />
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