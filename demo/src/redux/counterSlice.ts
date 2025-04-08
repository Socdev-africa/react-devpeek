// src/redux/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
  step: number;
  min: number;
  max: number;
  title: string;
  history: number[];
}

const initialState: CounterState = {
  count: 0,
  step: 1,
  min: -10,
  max: 10,
  title: 'Redux Counter',
  history: [0],
};

interface IncrementAction {
    type: string;
}

interface DecrementAction {
    type: string;
}

interface SetStepAction {
    type: string;
    payload: number;
}

interface ResetAction {
    type: string;
}

interface SetMaxAction {
    type: string;
    payload: number;
}

interface SetMinAction {
    type: string;
    payload: number;
}

interface SetTitleAction {
    type: string;
    payload: string;
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state: CounterState) => {
            const incrementedCount = state.count + state.step;
            if (incrementedCount <= state.max) {
                state.count = incrementedCount;
                state.history.push(incrementedCount);
            }
        },
        decrement: (state: CounterState) => {
            const decrementedCount = state.count - state.step;
            if (decrementedCount >= state.min) {
                state.count = decrementedCount;
                state.history.push(decrementedCount);
            }
        },
        setStep: (state: CounterState, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        reset: (state: CounterState) => {
            state.count = 0;
            state.history.push(0);
        },
        setMax: (state: CounterState, action: PayloadAction<number>) => {
            state.max = action.payload;
        },
        setMin: (state: CounterState, action: PayloadAction<number>) => {
            state.min = action.payload;
        },
        setTitle: (state: CounterState, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
    },
});

export const {
  increment,
  decrement,
  setStep,
  reset,
  setMax,
  setMin,
  setTitle,
} = counterSlice.actions;

export default counterSlice.reducer;