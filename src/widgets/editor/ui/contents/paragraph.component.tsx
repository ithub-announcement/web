import React from "react";

import { insertCaretAtEnd } from "@/widgets/editor/utils/insertCaretAtEnd";
import { BlockProps } from "../base/editor-block.component";
import { checkCaretAtEnd } from "../../utils/checkCaretAtEnd";

export const Paragraph: React.FC<BlockProps> = React.memo(
  (_props: BlockProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    /**
     * Обработчик события ввода текста в поле блока.
     * Вызывается при изменении содержимого элемента.
     * Обновляет состояние заголовка в Redux с новым текстом.
     * @param ev - Событие ввода, содержащее информацию о текущем содержимом.
     */
    const handleOnChange = React.useCallback(
      (_ev: React.FormEvent<HTMLDivElement>) => {},
      []
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

        /**
         * Эта функция будет служить логикой переноса текста в новый созданный блок.
         * В планах сделать ее просто как получение строк до и после курсора. =)
         */
        checkCaretAtEnd(ref);
      }
    };

    React.useEffect(() => {
      ref.current?.addEventListener("keydown", handleKeyDown);
      insertCaretAtEnd(ref);

      return () => {
        ref.current?.removeEventListener("keydown", handleKeyDown);
      };
    }, [ref]);

    return (
      <div
        className="w-full h-fit relative cursor-text focus:outline-none text-xl"
        ref={ref}
        onInput={handleOnChange}
        contentEditable
        suppressContentEditableWarning
        aria-placeholder="Введите текст"
      />
    );
  }
);
