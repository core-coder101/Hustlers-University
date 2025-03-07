import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";

export const GetClasses = createAsyncThunk(
  "GetClasses",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetClasses`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        if (!data.data.length > 0) {
          return rejectWithValue("Please create a class first");
        } else {
          return data.data
        }
      } else {
        return rejectWithValue(data.message || "Failed to get classes' data");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
  }
);

export const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async (playlistData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/Create-playlist`,
        playlistData,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to get classes' data");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
  }
);

export const getPlaylist = createAsyncThunk(
  "getPlaylist",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/PlaylistData`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to get Playlist data");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error fetching Playlist data")
    }
  }
);

export const uploadLecture = createAsyncThunk(
  "uploadLecture",
  async (formData, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/upload-video`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "multipart/form-data",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(setProgress(percentCompleted));
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to upload lecture");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error fetching Playlist data")
    }
  }
);

const initialState = {
  classesData: [],
  loading: false,
  error: null,
  popup: false,
  playlistData: [],
  progress: 0,
};

const ClassSlice = createSlice({
  name: "uploadLecture",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
      // even though we will only pass true or false to this but I'm still writing '!!' to ensure this stays as a boolean type state
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetClasses.pending, (state) => {
        state.error = "Loading Classes' Data";
        state.loading = true;
      })
      .addCase(GetClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classesData = action.payload;
      })
      .addCase(GetClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(createPlaylist.pending, (state) => {
        state.error = "Creating new playlist";
        state.loading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Playlist created successfully";
        state.popup = true;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(getPlaylist.pending, (state) => {
        state.error = "Loading playlist data";
        state.loading = true;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistData = action.payload.data;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(uploadLecture.pending, (state) => {
        state.progress = 0;
        state.error = "Uploading Lecture";
        state.loading = true;
      })
      .addCase(uploadLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Lecture uploaded successfully";
        state.progress = 0;
        state.popup = true;
      })
      .addCase(uploadLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.progress = 0;
        state.popup = true;
      });
  },
});

export const { setError, setPopup, setProgress } = ClassSlice.actions;

export default ClassSlice.reducer;
