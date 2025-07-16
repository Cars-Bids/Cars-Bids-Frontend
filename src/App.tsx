import './App.css'
import { Route, Routes ,BrowserRouter} from 'react-router-dom'
import MainLayout from './components/Main/index.tsx'
import HomePage from './pages/Base/HomePage.tsx'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* інші сторінки */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
