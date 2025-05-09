// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    doctorId: null,
    // Optional: add name, email, etc.
  },
  reducers: {
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    clearDoctorId: (state) => {
      state.doctorId = null;
    },
    setUser: (state, action) => {
      const { doctorId } = action.payload;
      state.doctorId = doctorId;
    },
  },
});

export const { setDoctorId, clearDoctorId, setUser } = userSlice.actions;
export default userSlice.reducer;
