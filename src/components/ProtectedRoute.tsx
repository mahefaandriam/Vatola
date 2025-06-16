import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

import { ReactNode } from 'react';

type AuthContextType = {
  user: any; // Replace 'any' with your actual user type if available
  loading: boolean;
};

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth() as AuthContextType;

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}