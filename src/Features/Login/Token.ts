import { redirect } from 'react-router-dom';

export const checkLoggedInUser = () => {
  const token = localStorage.getItem('userId');
  if (token) {
    return redirect('/home');
  }
  return null;
};

export const checkLogoutUser = () => {
  const token = localStorage.getItem('userId');
  if (!token) {
    return redirect('/login');
  }
  return null;
};
