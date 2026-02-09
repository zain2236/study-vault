/**
 * Toast notifications for resources page download operations
 */
import { toast } from 'react-toastify';

export const resourcesDownloadToast = {
  /**
   * Show error toast when download fails
   */
  error: (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show success toast when download starts
   */
  success: () => {
    toast.success('Download started!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

