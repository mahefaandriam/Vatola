import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import PubPage from './pages/PubPage';
import SpaPage from './pages/SpaPage';
import NailSalonPage from './pages/NailSalonPage';
import ContactPage from './pages/ContactPage';
import RestaurantPage from './pages/RestaurantPage';
import BookingPage from './pages/BookingPage';
import Login from './pages/Login';
import Register from './pages/Singup';
import AdminDashboard from './pages/admin/AdminDashboard';
import Reservations from './pages/admin/Reservations';
import Profile from './pages/Profile';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import PrivateRoute from './components/PrivateRoute';
import Users from './pages/admin/Users';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Rooms from './pages/admin/Rooms';
import NailsServices from './pages/admin/NailsServieces';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import Contacts from './pages/admin/Contacts';
import NotFoundPage from './pages/NotFoundPage';
import { ReservationProvider } from "./context/ReservationContext";
import AdminPub from './pages/admin/Pub';
import AdminSpa from './pages/admin/Spa';
import AdminMedia from './pages/admin/Media';
import AdminSocials from './pages/admin/Socials';

function App() {
  return (
    <Router>
      <ToastContainer />
      <ReservationProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <ScrollToTop />
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/singup" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route
                  path="/profil"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/admin/*"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }>
                  <Route path="reservations" element={<Reservations />} />
                  <Route path="utilisateurs" element={<Users />} />
                  <Route path="chambres" element={<Rooms />} />
                  <Route path="pub" element={<AdminPub />} />
                  <Route path="spa" element={<AdminSpa />} />
                  <Route path="nails" element={<NailsServices />} />
                  <Route path="media" element={<AdminMedia />} />
                  <Route path="socials" element={<AdminSocials />} />
                  <Route path="contacts" element={<Contacts />} />
                </Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/rooms/:id" element={<RoomDetailPage />} />
                <Route path="/pub" element={<PubPage />} />
                <Route path="/spa" element={<SpaPage />} />
                <Route path="/restaurant" element={<RestaurantPage />} />
                <Route path="/nail-salon" element={<NailSalonPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/booking" element={<BookingPage />} />
              </Routes>
          </main>
          <Footer />
        </div>
      </ReservationProvider>
    </Router>
  );
}

export default App;
