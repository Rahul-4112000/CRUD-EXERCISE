import { createSlice } from '@reduxjs/toolkit';
import { Iuser, IinitialUser } from '../user_interface';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialUser = {
  id: '',
  name: '',
  email: '',
  age: '',
  mobNum: '',
};

const initialState: IinitialUser = {
  users: [],
  selUser: initialUser,
  deleteUser: null,
  selUserIndex: -1,
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addInitialUsers(state, action: PayloadAction<Iuser[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<Iuser>) {
      state.users.push(action.payload);
    },
    removeUser(state) {
      state.users = state.users.filter((user) => user.id !== state.deleteUser?.id);
      state.deleteUser = null;
    },
    updateUser(state, action: PayloadAction<Iuser>) {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[userIndex] = action.payload;
    },
    setSelUser(state, action: PayloadAction<{ selUser: Iuser; index: number }>) {
      state.selUser = action.payload.selUser;
      state.selUserIndex = action.payload.index;
    },
    resetSelUser(state) {
      state.selUser = initialUser;
    },
    setDelUser(state, action: PayloadAction<Iuser>) {
      state.deleteUser = action.payload;
    },
    resetDelUser(state) {
      state.deleteUser = null;
    },
    setNextUser(state) {
      if (state.selUserIndex + 1 >= state.users.length) {
        return;
      }
      let nextUserIndex = state.selUserIndex + 1;
      let user = state.users[nextUserIndex];
      state.selUser = user;
      state.selUserIndex = nextUserIndex;
    },
    setPrevUser(state) {
      if (state.selUserIndex - 1 < 0) {
        return;
      }
      let prevUserIndex = state.selUserIndex - 1;
      let user = state.users[prevUserIndex];
      state.selUser = user;
      state.selUserIndex = prevUserIndex;
    },
    showLoading(state) {
      state.loading = true;
    },
    closeLoading(state) {
      state.loading = false;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
