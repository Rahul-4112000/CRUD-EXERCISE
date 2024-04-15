import { createSlice } from '@reduxjs/toolkit';
import { IloggedinUser, IregisteredUser } from '../login_interface';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IloggedinUser = {
  loginUser: null,
};

const credential = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setCredential(state, action: PayloadAction<IregisteredUser | null>) {
      state.loginUser = action.payload;
    },
  },
});

export const { setCredential } = credential.actions;
export const credentialReducer = credential.reducer;
