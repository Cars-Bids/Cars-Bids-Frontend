import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/Main'
import HomePage from '@/pages/Base/HomePage'
import SellYourCar from '@/pages/Base/SellYourCar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout restoreScroll={true} />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route path="/sell-your-car" element={<MainLayout restoreScroll={true} />}>
          <Route index element={<SellYourCar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
