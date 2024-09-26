import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  wrapper: {
    title: "",
    content: [
      {
        id: 0,
        type: "paragraph",
        value: "",
      },
    ],
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
    /**
     * Метод для изменения данных у определенного блока.
     *
     * @param id
     * @param value
     */
    setState: (
      _state,
      action: PayloadAction<{ id: number; value: string }>
    ) => {
      const c = _state.wrapper.content.find((x) => x.id === action.payload.id);
      if (c) {
        c.value = action.payload.value;
      }
    },

    /**
     * Метод для сброса данных у редактора.
     * @default
     */
    reset: (_state) => {
      _state = initialState;
    },
  },
});

export const EditorSliceReducer = EditorSlice.reducer;
export const EditorSliceActions = EditorSlice.actions;
