// pages/admin/AdminDashboard.jsx
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Bed, Beer, House, Laugh, MessageCircle, Sparkles, Users, Image as ImageIcon, Share2 } from 'lucide-react';
import Reservations from './Reservations';
import Rooms from './Rooms';
import NailsServices from './NailsServieces';
import Contacts from './Contacts';
import ListUsers from './Users';
import AdminPub from './Pub';
import AdminSpa from './Spa';
import AdminMedia from './Media';
import AdminSocials from './Socials';

export default function AdminDashboard() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUnreadCount = async () => {
      const { count, error } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);

      if (!error) setUnreadCount(count ?? 0);
    };

    const getUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate('/login');
          return;
        }
        navigate('/admin/reservations')
       // setEmail(user.email ?? '');
    };
  
    
    const interval = setInterval(fetchUnreadCount, 30000); // toutes les 30s4
    fetchUnreadCount(); 
    getUser();
    document.title = "Admin - Vatola Hotel";
    return () => clearInterval(interval);
  }, []);

 

  return (
    <>
      <div className='h-screen w-14 py-10 mt-19 md:mt-29 lg:mt-21 fixed left-0 flex flex-col justify-between shadow-xl bg-white z-50'>
        <div className='space-y-3'>
        
          <div 
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/chambres') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link 
              to="/admin/chambres"
            >
              <House size={20} />
            </Link>
          </div>

          <div 
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/reservations') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link 
              to="/admin/reservations"
            >
              <Bed size={20} />
            </Link>
          </div>

          <div 
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/utilisateurs') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link 
              to="/admin/utilisateurs"
            >
              <Users size={20} />
            </Link>
          </div>

          <div 
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/pub') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link 
              to="/admin/pub"
            >
              <Beer size={20} />
            </Link>
          </div>

          <div 
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/spa') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link 
              to="/admin/spa"
            >
              <Laugh size={20} />
            </Link>
          </div>

          <div
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/nails') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link
              to="/admin/nails"
            >
              <Sparkles size={20} />
            </Link>
          </div>

          <div
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/media') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link
              to="/admin/media"
            >
              <ImageIcon size={20} />
            </Link>
          </div>

          <div
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/socials') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link
              to="/admin/socials"
            >
              <Share2 size={20} />
            </Link>
          </div>

          <div
            className={`mx-3 py-2 rounded-lg flex items-center justify-center  hover:text-black text-gray-500 cursor-pointer
              ${location.pathname.includes('/admin/notifications') ? 'bg-gray-100' : 'bg-none'}
            `}
          >
            <Link
              to="/admin/contacts"
            >
              <span className="ml-2 top-2 relative bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                {unreadCount}
              </span>
              <MessageCircle size={20} />
            </Link>
          </div>

        </div>
        <div>
          a
        </div>
      </div>
      <div className='w-full h-auto overflow-x-hidden pl-15 pt-30'>
        <Routes>
          <Route path="chambres" element={<Rooms />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="utilisateurs" element={<ListUsers />} />
          <Route path="pub" element={<AdminPub />} />
          <Route path="spa" element={<AdminSpa />} />
          <Route path="nails" element={<NailsServices />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="socials" element={<AdminSocials />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </div>
    </>
  );
};
