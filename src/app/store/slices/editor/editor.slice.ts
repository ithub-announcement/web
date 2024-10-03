import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BlockType } from "@/widgets/editor/ui/base/editor-block.component";

type Block = {
  type: BlockType;
  value: string;
};

type initialStateType = {
  wrapper: {
    title: string;
    content: Block[];
  };
  origin: {
    uuid: string;
    title: string;
    content: Block[];
  };
  settings: {
    disable: boolean;
    focused: number;
  };
};

const initialState: initialStateType = {
  wrapper: {
    title: "",
    content: [
      {
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
    focused: 0,
  },
};

export const EditorSlice = createSlice({
  name: "editor/slice",
  initialState,
  reducers: {
    /**
     * Метод для изменения заголовка объявлений.
     * @param {PayloadAction<string>} action
     */
    updTitle: (_state, action: PayloadAction<string>) => {
      _state.wrapper.title = action.payload;
    },

    /**
     * Метод для изменения данных у определенного блока.
     * @param {PayloadAction<{ index: number; value: string }>} action
     */
    setState: (
      _state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      const current = _state.wrapper.content.find(
        (_, i) => i === action.payload.index
      );

      if (!current) return;

      current.value = action.payload.value;
      _state.wrapper.content[action.payload.index] = current;
    },

    create: (
      _state,
      _action: PayloadAction<{
        value?: string;
        focused: number;
      }>
    ) => {
      const object: Block = {
        type: "paragraph",
        value: _action.payload.value ?? "",
      };

      _state.wrapper.content.splice(_action.payload.focused + 1, 0, object);
    },

    /**
     * Метод для установки фокуса на определенном блоке объявления.
     * @param {PayloadAction<number>} action
     */
    focus: (_state, action: PayloadAction<number>) => {
      _state.settings.focused = action.payload;
    },

    /**
     * Метод для удаления фокуса с всех блоков объявления.
     */
    unfocus: (_state) => {
      _state.settings.focused = initialState.settings.focused;
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
