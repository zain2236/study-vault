/**
 * Toast notifications for sign-up operations
 */
import { toast } from 'react-toastify';

export const authSignupToast = {
  /**
   * Show success toast when sign-up succeeds
   */
  success: (message: string = 'Account created successfully! Redirecting...') => {
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
   * Show error toast when sign-up fails
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

