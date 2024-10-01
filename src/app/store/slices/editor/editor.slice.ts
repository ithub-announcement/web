import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BlockType } from "@/widgets/editor/ui/base/editor-block.component";

type ContentType = {
  [key: number]: {
    type: BlockType;
    value: string;
  };
};

type initialStateType = {
  wrapper: {
    title: string;
    content: ContentType;
  };
  origin: {
    uuid: string;
    title: string;
    content: {
      [key: number]: {
        type: BlockType;
        value: string;
      };
    };
  };
  settings: {
    disable: boolean;
    focused: number;
  };
};

const initialState: initialStateType = {
  wrapper: {
    title: "",
    content: {
      1: {
        type: "paragraph",
        value: "",
      },
    },
  },
  origin: {
    uuid: "",
    title: "",
    content: [],
  },
  settings: {
    disable: false,
    focused: 1,
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
     * @param {PayloadAction<{ id: number; value: string }>} action
     */
    setState: (
      _state,
      action: PayloadAction<{ id: number; value: string }>
    ) => {
      if (_state.wrapper.content[action.payload.id]) {
        _state.wrapper.content = {
          ..._state.wrapper.content,
          [action.payload.id]: {
            ..._state.wrapper.content[action.payload.id],
            value: action.payload.value,
          },
        };
      }
    },

    /**
     * Метод для создания блока в редакторе.
     * @param {PayloadAction<string | undefined>} action
     */
    create: (_state, action: PayloadAction<string | undefined>) => {
      const current = { ..._state.wrapper.content };

      for (
        let i = Object.keys(current).length;
        i > _state.settings.focused;
        i--
      ) {
        current[i + 1] = current[i];
      }

      current[_state.settings.focused + 1] = {
        type: "paragraph",
        value: action.payload ?? "",
      };

      _state.wrapper.content = current;
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
