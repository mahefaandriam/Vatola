// pages/admin/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Reservations from './Reservations'; // Adjust the import path as necessary
import Users from './Users'; // Adjust the import path as necessary

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex mt-50">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <nav className="space-y-2">
          <Link to="/admin/reservations">Réservations</Link>
          <Link to="/admin/utilisateurs">Utilisateurs</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        <Routes>
          <Route path="reservations" element={<Reservations />} />
          <Route path="utilisateurs" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}
