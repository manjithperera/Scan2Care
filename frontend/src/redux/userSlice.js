import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    doctorId: null,
    patientId: null,
    name: null,
    email: null,
    userType: null,
  },
  reducers: {
    setUser: (state, action) => {
      const {
        _id,
        doctor_id,
        patient_id,
        name,
        email,
        user_type,
      } = action.payload;

      state.userId = _id ?? null;
      state.doctorId = doctor_id ?? null;
      state.patientId = patient_id ?? null;
      state.name = name ?? null;
      state.email = email ?? null;
      state.userType = user_type ?? null;
    },
    clearUser: (state) => {
      state.userId = null;
      state.doctorId = null;
      state.patientId = null;
      state.name = null;
      state.email = null;
      state.userType = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
