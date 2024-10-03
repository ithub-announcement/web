import React from "react";

import { useActions } from "@/shared/hooks/redux/redux.actions";
import { BlockProps } from "../base/editor-block.component";
import { insertCaretAtEnd } from "../../utils/insertCaretAtEnd";
import { splitTextByCaret } from "../../utils/splitTextByCaret";

export const Paragraph: React.FC<BlockProps> = (_props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { setState, focus, unfocus } = useActions();

  /**
   * Обработчик события ввода текста в поле блока.
   * Вызывается при изменении содержимого элемента.
   * Обновляет состояние заголовка в Redux с новым текстом.
   * @param ev - Событие ввода, содержащее информацию о текущем содержимом.
   */
  const handleOnChange = React.useCallback(
    (_ev: React.FormEvent<HTMLDivElement>) => {
      setState({ index: _props.id, value: _ev.currentTarget.innerHTML });
    },
    []
  );

  const lineBreak = () => {
    const element = ref.current;
    if (!element) return;

    const text = splitTextByCaret(ref);

    console.log(text);
  };

  /**
   * Обработчик события нажатия клавиш в поле заголовка.
   * Запрещает действие по умолчанию при нажатии клавиши "Enter",
   * чтобы предотвратить переход на новую строку.
   * @param ev - Событие нажатия клавиши, содержащее информацию о нажатой клавише.
   */
  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      lineBreak();
    }
  };

  React.useEffect(() => {
    // Функция для исправления бага с написанием текста внутри блока.
    insertCaretAtEnd(ref);

    if (ref.current) {
      ref.current?.addEventListener("keydown", handleKeyDown);

      return () => {
        ref.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [_props.value]);

  return (
    <>
      <div
        aria-level={_props.id}
        className="w-full h-fit relative cursor-text focus:outline-none text-xl inline-block mb-5"
        ref={ref}
        onInput={handleOnChange}
        contentEditable
        suppressContentEditableWarning
        aria-placeholder="Введите текст"
        dangerouslySetInnerHTML={{ __html: _props.value }}
        onFocus={() => focus(_props.id)}
        onBlur={() => unfocus()}
      />
    </>
  );
};
