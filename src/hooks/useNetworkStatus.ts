import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { t } = useTranslation();

  useEffect(() => {
    let toastId: string | null = null;

    const handleOnline = () => {
      setIsOnline(true);
      if (toastId) {
        toast.dismiss(toastId);
        toastId = null;
      }
      toast.success('Connection restored', { duration: 3000 });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toastId = toast.error(t('common.networkError'), { 
        duration: Infinity, // Keep the toast until connection is restored
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [t]);

  return isOnline;
};