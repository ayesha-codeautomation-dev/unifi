import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for login
export const authenticateUser = createAsyncThunk(
  "unifi/authenticateUser",
  async ({ controllerUrl, username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/unifi/login",
        { controllerUrl, username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return { session: response.data, controllerUrl }; // Return session and controllerUrl
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed. Please try again.");
    }
  }
);

// Thunk for fetching sites
export const fetchSites = createAsyncThunk(
  "unifi/fetchSites",
  async (_, { getState, rejectWithValue }) => {
    const { session, controllerUrl } = getState().unifi;
    try {
      const response = await axios.post(
        "http://localhost:5000/unifi/user/sites",
        { controllerUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `unifi_session=${session}`,
          },
        }
      );
      return response.data; // list of sites
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch sites.");
    }
  }
);

const unifiSlice = createSlice({
  name: "unifi",
  initialState: {
    session: null,
    controllerUrl: null, // Save controllerUrl in state
    sites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session; // store the session
        state.controllerUrl = action.payload.controllerUrl; // store the controllerUrl
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = action.payload; // store sites
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unifiSlice.reducer;
