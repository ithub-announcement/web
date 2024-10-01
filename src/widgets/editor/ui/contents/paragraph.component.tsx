import React from "react";

import { BlockProps } from "../base/editor-block.component";
import { insertCaretAtEnd } from "../../utils/insertCaretAtEnd";
import { useActions } from "@/shared/hooks/redux/redux.actions";
import { EditorAPI } from "../../api";

export const Paragraph: React.FC<BlockProps> = React.memo((props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { setState, focus, unfocus, create } = useActions();

  /**
   * Обработчик события ввода текста в поле блока.
   * Вызывается при изменении содержимого элемента.
   * Обновляет состояние заголовка в Redux с новым текстом.
   * @param ev - Событие ввода, содержащее информацию о текущем содержимом.
   */
  const handleOnChange = React.useCallback(
    (_ev: React.FormEvent<HTMLDivElement>) => {
      setState({ id: +props.id, value: _ev.currentTarget.innerHTML });
    },
    [props.value]
  );

  /**
   * Обработчик события нажатия клавиш в поле заголовка.
   * Запрещает действие по умолчанию при нажатии клавиши "Enter",
   * чтобы предотвратить переход на новую строку.
   * @param ev - Событие нажатия клавиши, содержащее информацию о нажатой клавише.
   */
  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      ev.preventDefault();

      EditorAPI.create(ref, create);
    }
  };

  React.useEffect(() => {
    if (ref) {
      insertCaretAtEnd(ref);

      ref.current?.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      ref.current?.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <div
        aria-level={props.id}
        className="w-full h-fit relative cursor-text focus:outline-none text-xl inline-block mb-5"
        onInput={handleOnChange}
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        aria-placeholder="Введите текст"
        dangerouslySetInnerHTML={{ __html: props.value }}
        onFocus={() => focus(props.id)}
        onBlur={() => unfocus()}
        autoFocus
      />
    </>
  );
});
