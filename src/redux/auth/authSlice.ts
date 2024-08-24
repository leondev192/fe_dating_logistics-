import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginResponse} from '../../models/authModel';

interface AuthState {
  user: LoginResponse['data'] | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponse['data']>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
