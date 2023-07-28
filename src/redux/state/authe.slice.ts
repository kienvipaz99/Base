import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {auth: string} = {
  auth: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;
