import './App.css'
import { Route, Routes ,BrowserRouter} from 'react-router-dom'
import MainLayout from './components/Main/index.tsx'
import HomePage from './pages/Base/HomePage.tsx'
import SellYourCar from './pages/Base/SellYourCar.tsx'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/sell-your-car' element={<SellYourCar/>}/>
          {/* інші сторінки */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
