import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/Main';
import HomePage from '@/pages/Base/HomePage';
import SellYourCar from '@/pages/Base/SellYourCar';
import ProfilePage from "@/pages/Base/ProfilePage";
import SellerDashboard from '@/pages/Base/SellerDashboard';
import Settings from "@/pages/Base/Settings";
import WatchList from './pages/Base/WatchList';
import { useLangFromURL } from './hooks/Lang';
import { useSelector } from 'react-redux';
import { type RootState } from './app/store';
import NotFound404 from './pages/Errors/404';
import SellCarPage from "@/pages/Base/SellCarPage.tsx";
import AuctionPage from "@/pages/Base/AuctionPage.tsx";
import { AboutPage } from "@/pages/Base/AboutPage.tsx";
import ChatPage from "@/pages/Base/ChatPage.tsx";
import ManagerDashboard from "@/pages/Admin/ManagerDashbord.tsx";
import CreateAuctionPage from './pages/Base/AuctionCreatePage';
import AuctionApprovalPage from "@/pages/Base/AuctionApprovalPage.tsx";
import ProtectedRoute from "@/hooks/Protector";
import AcceptPage from './pages/Admin/AcceptPage';
function LangWrapper() {
  useLangFromURL();


  const currentLang = useSelector((state: RootState) => state.lang.current);

  if (!currentLang) return null;
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${currentLang.toLowerCase()}/home`} replace />} />

      <Route path="/:lang" element={<MainLayout restoreScroll={true} />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="reset-password" element={<HomePage />} />
        <Route path="sell-your-car" element={<SellYourCar />} />
        <Route path="auction/:id" element={<AuctionPage />} />
        <Route path="auction-approval/:id" element={<AuctionApprovalPage />} />
        <Route path="sell-car" element={<SellCarPage />} />
        <Route path="chat/:id" element={<ChatPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="create-auction" element={<CreateAuctionPage />} />
        <Route path="whats-steria" element={<AboutPage />} />
        <Route path="seller-dashboard" element={<SellerDashboard />} />
        <Route path="watchlist" element={<WatchList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound404 />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={['Manager', 'Admin']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="accept-page/:id"
          element={
            <ProtectedRoute allowedRoles={['Manager', 'Admin']}>
              <AcceptPage />
            </ProtectedRoute>
          }
        />

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
