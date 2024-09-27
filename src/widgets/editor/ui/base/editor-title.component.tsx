import React from "react";
import { useTypedSelector } from "@/shared/hooks/redux/redux.selector";
import { useActions } from "@/shared/hooks/redux/redux.actions";
import { insertCaretAtEnd } from "../../utils/insertCaretAtEnd";

type Props = {
  maxLength?: number;
};

export const Title: React.FC<Readonly<Props>> = ({
  maxLength = 64,
}): React.ReactElement => {
  const payload = useTypedSelector((state) => state.EditorSliceReducer);
  const { updTitle } = useActions();

  const titleRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * Обработчик события ввода текста в поле заголовка.
   * Вызывается при изменении содержимого элемента.
   * Обновляет состояние заголовка в Redux с новым текстом.
   * @param ev - Событие ввода, содержащее информацию о текущем содержимом.
   */
  const handleOnChange = (ev: React.FormEvent<HTMLDivElement>) => {
    const text = ev.currentTarget.innerHTML;
    if (text.length <= maxLength) updTitle(ev.currentTarget.innerHTML);
    else ev.currentTarget.innerHTML = payload.wrapper.title;
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
    }
  };

  React.useEffect(() => {
    titleRef.current?.addEventListener("keydown", handleKeyDown);

    insertCaretAtEnd(titleRef);

    return () => {
      titleRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [titleRef && payload.wrapper.title]);

  return (
    <div
      className="w-full h-fit text-4xl font-extrabold outline-none relative"
      onInput={handleOnChange}
      contentEditable
      suppressContentEditableWarning
      ref={titleRef}
      aria-placeholder="Заголовок"
      dangerouslySetInnerHTML={{ __html: payload.wrapper.title }}
    />
  );
};
