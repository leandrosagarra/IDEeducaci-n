import React from 'react';
import { useData } from '../context/DataContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { data } = useData();
  const { settings } = data;

  const handleOpenWhatsApp = () => {
    const cleanNumber = (settings.whatsapp || '+5492214535780').replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hola ${settings.instituteName}, me contacto desde el sitio web para solicitar información institucional.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={handleOpenWhatsApp}
        id="floating-whatsapp-btn"
        className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 cursor-pointer border border-emerald-400/30"
        title="WhatsApp"
        aria-label="Abrir WhatsApp institucional"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white flex-shrink-0" />
      </button>
    </div>
  );
};
