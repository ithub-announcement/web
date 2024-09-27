import React from "react";

import { useTypedSelector } from "@/shared/hooks/redux/redux.selector";
import { Block, BlockProps } from "./editor-block.component";
import { EditorContext } from "./editor.component";

/**
 * List
 *
 * Компонент, отображающий список блоков содержания редактора объявлений.
 *
 * Использует хук useTypedSelector для получения данных из Redux-стора.
 * Каждый элемент списка представляет собой компонент Block,
 * который получает соответствующие свойства из состояния редактора.
 */
export const List: React.FC = React.memo(() => {
  const theme = React.useContext(EditorContext);
  const { content } = useTypedSelector(
    (state) => state.EditorSliceReducer.wrapper
  );
  return (
    <div className={theme.list}>
      {content.map((el, i) => (
        <Block key={i} {...(el as BlockProps)} />
      ))}
    </div>
  );
});
