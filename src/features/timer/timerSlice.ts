import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_TIMER } from '../../constants';
import { RootState } from '../../app/store';

interface TimerState {
  value: number;
}

const initialState: TimerState = {
  value: DEFAULT_TIMER,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
    decrement: (state) => {
      if (state.value <= 0) return state;
      state.value -= 1;
    },
  },
});

export const { setTimer, reset, decrement } = timerSlice.actions;

export const selectTimerValue = (state: RootState) => state.timer.value;

export default timerSlice.reducer;
