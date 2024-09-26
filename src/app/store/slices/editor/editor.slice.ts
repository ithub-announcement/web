import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wrapper: {
    title: "",
    content: [],
  },
  origin: {
    uuid: "",
    title: "",
    content: [],
  },
  settings: {
    disable: false,
  },
};

export const EditorSlice = createSlice({
  name: "editor/slice",
  initialState,
  reducers: {
    reset: (_state) => {
      _state = initialState;
    },
  },
});

export const EditorSliceReducer = EditorSlice.reducer;
export const EditorSliceActions = EditorSlice.actions;
