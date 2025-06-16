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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
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
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/pub" element={<PubPage />} />
            <Route path="/spa" element={<SpaPage />} />
            <Route path="/nail-salon" element={<NailSalonPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;