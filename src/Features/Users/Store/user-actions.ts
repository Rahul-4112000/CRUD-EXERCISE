import { userAction } from './user-slice';
import { errToaster, successToaster } from '../../../Shared/UI/Toaster';
import { Isignup } from '../../Login/login_interface';
import { Iuser } from '../user_interface';
const { addInitialUsers, addUser, removeUser, updateUser } = userAction;
import { ThunkDispatch } from '@reduxjs/toolkit';

export const doLogin = async (fullName: string, password: string) => {
  const response = await fetch(`http://localhost:3000/credentials?fullName=${fullName}&&password=${password}`);
  if (!response.ok) {
    throw new Error();
  }
  const [loginUser] = await response.json();
  return loginUser;
};

export const doSignup = async (aSignupUser: Isignup) => {
  const response = await fetch('http://localhost:3000/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aSignupUser),
  });
  const registeredUser = await response.json();
  return registeredUser;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Something went wrong while fetching users!!!');
    }
    const users = await response.json();
    dispatch(addInitialUsers(users));
  };
};

export const saveUser = (aUser: Iuser) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aUser),
      });

      if (!response.ok) {
        throw new Error();
      }

      const addedUser = await response.json();
      dispatch(addUser(addedUser));
      successToaster('New User Added');
    } catch {
      errToaster("Oops!! User can't be add");
    }
  };
};

export const UpdateUserFromList = (aUser: Iuser) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${aUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aUser),
      });

      if (!response.ok) {
        throw new Error();
      }

      const updatedUser = await response.json();
      successToaster('Changes saved!!!');
      dispatch(updateUser(updatedUser));
    } catch {
      errToaster("Oops!! Changes can't be saved");
    }
  };
};

export const removeUserFromList = (aUserId: string) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${aUserId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error();
      }

      await response.json();
      dispatch(removeUser());
      successToaster('User Deleted!!!');
    } catch (err) {
      errToaster("Oops!! User can't be deleted");
    }
  };
};
