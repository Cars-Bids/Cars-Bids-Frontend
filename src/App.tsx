import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/Main';
import HomePage from '@/pages/Base/HomePage';
import SellYourCar from '@/pages/Base/SellYourCar';
import ProfilePage from "@/pages/Base/ProfilePage";
import { useLangFromURL } from './hooks/Lang';
import { useSelector  } from 'react-redux';
import { type RootState } from './app/store';
import NotFound404 from './pages/Errors/404';
import AuctionPage from "@/pages/Base/AuctionPage.tsx";
import {AboutPage} from "@/pages/Base/AboutPage.tsx";

function LangWrapper() {
    useLangFromURL();

    const currentLang = useSelector((state: RootState) => state.lang.current);

    // Якщо мова ще не визначена — нічого не рендеримо
    if (!currentLang) return null; // або <Loader />

    const lang = currentLang.toLowerCase();

    return (
        <Routes>
            {/* Редіректи від кореня без мови */}
            <Route path="/" element={<Navigate to={`/${lang}/home`} replace />} />
            <Route path="sell-your-car" element={<Navigate to={`/${lang}/sell-your-car`} replace />} />
            <Route path="profile" element={<Navigate to={`/${lang}/profile`} replace />} />
            <Route path="reset-password" element={<Navigate to={`/${lang}/reset-password`} replace />} />
            <Route path="whats-steria" element={<Navigate to={`/${lang}/whats-steria`} replace />} />
            {/* Основні сторінки всередині мови */}
            <Route path="/:lang" element={<MainLayout restoreScroll={true} />}>
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="sell-your-car" element={<SellYourCar />} />
                <Route path="whats-steria" element={<AboutPage/>}/>
                <Route path="auction/:id" element={<AuctionPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="reset-password" element={<HomePage />} />
                <Route path="*" element={<NotFound404 />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound404 />} />
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
