import axios from 'axios';
import { showAlert } from './alert';

export const visibilityControl = async (id, value) => {
  try {
    const bool = value === 0 ? false : true;
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/blogs/${id}`,
      data: {
        visibility: bool,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Blog visibility changed successfully');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (e) {
    showAlert('error', 'Error while changing visibility! Try again..');
  }
};
