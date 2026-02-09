/**
 * Toast notifications for dashboard delete operations
 */
import { toast } from 'react-toastify';

export const dashboardDeleteToast = {
  /**
   * Show success toast when resource is deleted
   */
  success: (resourceTitle: string) => {
    toast.success(`"${resourceTitle}" deleted successfully`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show error toast when delete fails
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

