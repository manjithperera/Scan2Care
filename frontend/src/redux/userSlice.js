import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    doctorId: null,
    name: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { doctorId, name, email } = action.payload;
      state.doctorId = doctorId;
      state.name = name;
      state.email = email;
    },
    logoutUser: (state) => {
      state.doctorId = null;
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
