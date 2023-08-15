import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PayloadLogin} from '../type/Auth';

const initialState = {
  getdataUser: {
    username: '',
    password: '',
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<PayloadLogin>) => {
      state.getdataUser = action.payload;
    },
  },
});

export const {setDataUser} = loginSlice.actions;
export default loginSlice.reducer;
