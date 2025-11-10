import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

type NotificationSettings = {
  id: number;
  email: string;
  notify_message: boolean;
  notify_reservation: boolean;
  created_at: string;
};

export default function AdminParametre() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_notif')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        return;
      }

      setSettings(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      setMessage('');

      const { error } = await supabase
        .from('email_notif')
        .update({
          email: settings.email,
          notify_message: settings.notify_message,
          notify_reservation: settings.notify_reservation,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) {
        throw error;
      }

      setMessage('Paramètres mis à jour avec succès!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setMessage('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailChange = (email: string) => {
    setSettings(prev => prev ? { ...prev, email } : null);
  };

  const toggleNotification = (type: 'message' | 'reservation') => {
    setSettings(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        notify_message: type === 'message' ? !prev.notify_message : prev.notify_message,
        notify_reservation: type === 'reservation' ? !prev.notify_reservation : prev.notify_reservation
      };
    });
  };

  if (loading) {
    return <LoadingComponents />;
  }

  if (!settings) {
    return (
      <div className="p-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Impossible de charger les paramètres de notification
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 justify-center items-start">
      <h2 className="text-2xl font-bold mb-6">Paramètres de Notification</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.includes('Erreur') 
            ? 'bg-red-100 border border-red-400 text-red-700' 
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email de réception des notifications
          </label>
          <input
            type="email"
            id="admin-email"
            value={settings.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent"
            placeholder="admin@votresite.com"
          />
          <p className="mt-1 text-sm text-gray-500">
            L'adresse email qui recevra les notifications
          </p>
        </div>

        {/* Notification Switches */}
        <div className="space-y-6">
          {/* Reservation Notifications */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Notifications de Réservations</h3>
              <p className="text-sm text-gray-500 mt-1">
                Recevoir un email lorsqu'une nouvelle réservation est effectuée
              </p>
            </div>
            <button
              onClick={() => toggleNotification('reservation')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2 ${
                settings.notify_reservation ? 'bg-primary-800' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.notify_reservation ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Message Notifications */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Notifications de Messages</h3>
              <p className="text-sm text-gray-500 mt-1">
                Recevoir un email lorsqu'un nouveau message est reçu
              </p>
            </div>
            <button
              onClick={() => toggleNotification('message')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2 ${
                settings.notify_message ? 'bg-primary-800' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.notify_message ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${
            settings.notify_reservation 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                settings.notify_reservation ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                settings.notify_reservation ? 'text-green-800' : 'text-gray-600'
              }`}>
                Notifications réservations: {settings.notify_reservation ? 'Activées' : 'Désactivées'}
              </span>
            </div>
          </div>

          <div className={`p-3 rounded-lg ${
            settings.notify_message 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                settings.notify_message ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                settings.notify_message ? 'text-green-800' : 'text-gray-600'
              }`}>
                Notifications messages: {settings.notify_message ? 'Activées' : 'Désactivées'}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={updateSettings}
            disabled={saving}
            className="bg-primary-800 text-white px-6 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Mise à jour...' : 'Enregistrer les modifications'}
          </button>
        </div>

        {/* Last Updated */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Dernière mise à jour: {new Date(settings.created_at).toLocaleDateString('fr-FR')}
        </div>
      </div>
    </div>
  );
}
