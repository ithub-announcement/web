import React from "react";

/**
 * Устанавливает курсор в конец элемента, на который ссылается ref.
 *
 * Эта функция проверяет, что элемент существует и является активным.
 * Если это так, она создает пустой текстовый узел и добавляет его в элемент,
 * после чего устанавливает курсор в конец этого узла, позволяя пользователю
 * продолжить ввод текста.
 *
 * Используется для обеспечения удобства редактирования, особенно в контексте
 * текстовых полей или элементов, где требуется ввод данных.
 *
 * @utils
 */
export const insertCaretAtEnd = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const el = ref.current;
  if (!el) return;

  const target = document.createTextNode("");
  el.appendChild(target);

  if (
    document.activeElement === el &&
    target !== null &&
    target.nodeValue !== null
  ) {
    const s = window.getSelection();

    if (s) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);

      s.removeAllRanges();
      s.addRange(range);
    }
  }
};
