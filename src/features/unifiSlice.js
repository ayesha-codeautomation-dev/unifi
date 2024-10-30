import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for login
export const authenticateUser = createAsyncThunk(
  "unifi/authenticateUser",
  async ({ controllerUrl, username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://portal.captifi.io/unifi/login",
        { controllerUrl, username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data; // returns the session cookie if successful
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching sites
export const fetchSites = createAsyncThunk(
  "unifi/fetchSites",
  async (_, { getState, rejectWithValue }) => {
    const { session } = getState().unifi;
    try {
      const response = await axios.post(
        "https://portal.captifi.io/unifi/user/sites",
        { controllerUrl: "https://unifi.netviva.co.uk:8443" },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `unifi_session=${session}`,
          },
        }
      );
      return response.data; // list of sites
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const unifiSlice = createSlice({
  name: "unifi",
  initialState: {
    session: null,
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
        state.session = action.payload; // store the session
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.sites = action.payload; // store sites
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default unifiSlice.reducer;
