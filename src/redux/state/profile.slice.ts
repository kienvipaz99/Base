import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PayloadLogin, Profile} from '../type/Auth';

const initialState = {
  getProfile: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.getProfile = action.payload;
    },
  },
});

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;
