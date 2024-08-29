import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { LOGIN_STATE_ENUM } from '../../constants';

interface LoginStateType {
  value: LOGIN_STATE_ENUM;
}

const initialState: LoginStateType = {
  value: LOGIN_STATE_ENUM.LOGOUT
};

export const loginSlice = createSlice({
  name: 'loginer',
  initialState,
  reducers: {
    login: state => {
      state.value = LOGIN_STATE_ENUM.LOGIN;
    },
    logout: state => {
      state.value = LOGIN_STATE_ENUM.LOGOUT;
    },
    ready: state => {
      state.value = LOGIN_STATE_ENUM.READY;
    }
  }
});

export const { login, logout, ready } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.loginer.value;
export default loginSlice.reducer;
