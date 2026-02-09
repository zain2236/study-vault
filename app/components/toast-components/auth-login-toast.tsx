/**
 * Toast notifications for login operations
 */
import { toast } from 'react-toastify';

export const authLoginToast = {
  /**
   * Show success toast when login succeeds
   */
  success: (message: string = 'Login successful! Redirecting...') => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show error toast when login fails
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

