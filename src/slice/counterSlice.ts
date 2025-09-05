import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
// cast state instead of declaring variable type
const initialState: CounterState = {
  value: 0,
} satisfies CounterState as CounterState;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
// export const selectCount = (state: RootState) => state.counter.value;
export const counterReducer = counterSlice.reducer;
