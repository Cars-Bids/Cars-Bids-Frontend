import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/Main';
import HomePage from '@/pages/Base/HomePage';
import SellYourCar from '@/pages/Base/SellYourCar';
import ProfilePage from "@/pages/Base/ProfilePage";
import { useLangFromURL } from './hooks/Lang';
import { useSelector  } from 'react-redux';
import { type RootState } from './app/store';
import NotFound404 from './pages/Errors/404';

function LangWrapper() {
 useLangFromURL(); 
  

 const currentLang = useSelector((state: RootState) => state.lang.current);

  if (!currentLang) return null; // або можна показати лоадер

  return (
    <Routes>
      {/* Редірект з кореня на мову з Redux */}
      <Route path="/" element={<Navigate to={`/${currentLang.toLowerCase()}/home`} replace />} />

      {/* Сторінки з мовним префіксом */}
      <Route path="/:lang" element={<MainLayout restoreScroll={true} />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="reset-password" element={<HomePage />} />
        <Route path="sell-your-car" element={<SellYourCar />} />
        <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound404/>} />
      </Route>

    
    </Routes>
  );
}

function App() {

  return (
    <BrowserRouter>
       <LangWrapper />
    </BrowserRouter>
  );
}

export default App;
