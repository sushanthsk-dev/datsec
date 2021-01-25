/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const contactResponse = async (name, email, subject, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/response/',
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Response sent successfully..');
      window.setTimeout(() => {
        location.assign('/contact');
      }, 1500);
    }
  } catch (e) {
    showAlert('error', 'Failed to send response.. Please try again!');
  }
};

export const createBlog = async (data, id) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/blogs`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Blog created');
      window.setTimeout(() => {
        location.assign('/admin/blogs');
      }, 1000);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};

export const updateBlog = async (data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/blogs/${id}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Blog updated');
      window.setTimeout(() => {
        location.assign('/admin/blogs');
      }, 1000);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};
