/**
 * Toast notifications for dashboard download operations
 */
import { toast } from 'react-toastify';

export const dashboardDownloadToast = {
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
};

