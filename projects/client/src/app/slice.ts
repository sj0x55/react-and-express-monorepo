import type { TAppState } from 'types/slice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateStatus } from './enums';
import { fetchDataPayloadCreator } from './operations';
import * as reducers from './reducers';

const initialState: TAppState = {
  status: StateStatus.IDLE,
  data: [],
  filters: {
    new: true,
    used: true,
  },
};

export const fetchDataAsync = createAsyncThunk('data/fetch', fetchDataPayloadCreator);
export const { reducer, actions } = createSlice({
  name: 'data',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, reducers.setLoadingStatus)
      .addCase(fetchDataAsync.fulfilled, reducers.setFulfilledStatus);
  },
});

export default reducer;
