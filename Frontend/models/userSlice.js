import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Register User
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isError: false },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
