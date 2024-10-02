import React, { useContext } from "react";
import { useTypedSelector } from "@/shared/hooks/redux/redux.selector";
import { useActions } from "@/shared/hooks/redux/redux.actions";
import { insertCaretAtEnd } from "../../utils/insertCaretAtEnd";
import { EditorContext } from "./editor.component";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  maxLength?: number;
}

/**
 * Title
 *
 * Этот компонент представляет собой поле ввода заголовка для редактора объявлений.
 * Он позволяет пользователю вводить и редактировать заголовок объявления.
 *
 * @param {Props} props
 */
export const Title: React.FC<Readonly<Props>> = ({
  maxLength = 64,
  ...props
}): React.ReactElement => {
  const theme = useContext(EditorContext);

  const payload = useTypedSelector((state) => state.EditorSliceReducer);
  const { updTitle } = useActions();

  const titleRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * Обработчик события ввода текста в поле заголовка.
   * Вызывается при изменении содержимого элемента.
   * Обновляет состояние заголовка в Redux с новым текстом.
   * @param ev - Событие ввода, содержащее информацию о текущем содержимом.
   */
  const handleOnChange = React.useCallback(
    (ev: React.FormEvent<HTMLDivElement>) => {
      const text = ev.currentTarget.innerHTML;
      if (text.length <= maxLength) updTitle(ev.currentTarget.innerHTML);
      else ev.currentTarget.innerHTML = payload.wrapper.title;
    },
    [payload.wrapper.title]
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
      className={theme.title}
      onInput={handleOnChange}
      contentEditable
      suppressContentEditableWarning
      ref={titleRef}
      aria-placeholder="Заголовок"
      dangerouslySetInnerHTML={{ __html: payload.wrapper.title }}
      {...props}
    />
  );
};
