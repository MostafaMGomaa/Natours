/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
// passURL: http://127.0.0.1:3000/api/v1/users/updateMyPassword
export const updateSettings = async (data, type) => {
  try {
    const url =
      data === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    console.log(res.data.status);
    if (res.data.status === 'success') {
      console.log('in before alert');
      showAlert('success', `${type.toUpperCase()}  updated successfully`);
      console.log('in after alert');
    }
    console.log('after alert');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
