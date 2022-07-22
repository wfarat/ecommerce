import axios from 'axios';

export const registerUser = async (data) => {
  const res = await axios('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
  const {user} = res.data;
  return user;
};
