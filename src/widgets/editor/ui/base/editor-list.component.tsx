import React from "react";

import { useTypedSelector } from "@/shared/hooks/redux/redux.selector";
import { Block, BlockProps } from "./editor-block.component";

/**
 * List
 *
 * Компонент, отображающий список блоков содержания редактора объявлений.
 *
 * Использует хук useTypedSelector для получения данных из Redux-стора.
 * Каждый элемент списка представляет собой компонент Block,
 * который получает соответствующие свойства из состояния редактора.
 *
 */
export const List: React.FC = React.memo(() => {
  const { content } = useTypedSelector(
    (state) => state.EditorSliceReducer.wrapper
  );
  return (
    <div className="flex flex-col space-y-10">
      {content.map((el) => (
        <Block {...(el as BlockProps)} />
      ))}
    </div>
  );
});
