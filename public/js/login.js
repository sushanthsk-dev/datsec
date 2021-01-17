/* eslint-disabled */
import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in Successfully');
      window.setTimeout(() => location.assign('/admin/blogs'));
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) location.assign('/admin');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again..');
  }
};

export const forgotPassword = async (emailId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email: emailId,
      },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Reset url sent to email');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 1000);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};

export const resetPassword = async (password, confirmPassword, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password: password,
        passwordConfirm: confirmPassword,
      },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Password updated successfully');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 1000);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};
