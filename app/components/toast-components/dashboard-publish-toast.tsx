/**
 * Toast notifications for dashboard publish/unpublish operations
 */
import { toast } from 'react-toastify';

export const dashboardPublishToast = {
  /**
   * Show success toast when resource is published
   */
  publishSuccess: (resourceTitle: string) => {
    toast.success(`"${resourceTitle}" published successfully`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show success toast when resource is unpublished
   */
  unpublishSuccess: (resourceTitle: string) => {
    toast.success(`"${resourceTitle}" unpublished successfully`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show error toast when publish/unpublish fails
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

