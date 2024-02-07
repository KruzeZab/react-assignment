import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

interface IWeatherData {
  apparent_temperature: number;
  interval: number;
  is_day: number;
  rain: number;
  relative_humidity_2m: number;
  showers: number;
  snowfall: number;
  temperature_2m: number;
  time: string;
  wind_direction_10m: number;
  wind_speed_10m: number;
}

type RequestState = 'pending' | 'fulfilled' | 'rejected';

interface IWeatherState {
  data: IWeatherData | null;
  status: RequestState;
  error: string | null;
}

const initialState: IWeatherState = {
  data: null,
  status: 'pending',
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=27.673&longitude=85.43&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,wind_speed_10m,wind_direction_10m',
      );

      const data = await response.json();
      return data.current as IWeatherData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<IWeatherData>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'rejected';
        state.data = null;
        state.error = (action.payload as string) ?? 'Unknown error';
      });
  },
});

export const selectWeatherData = (state: RootState) => state.weather.data;
export const selectWeatherStatus = (state: RootState) => state.weather.status;
export const selectWeatherError = (state: RootState) => state.weather.error;

export default weatherSlice.reducer;
