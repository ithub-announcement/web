/**
 * splitTextByCaret
 *
 * Эта функция обрабатывает текстовое содержимое элемента, на который ссылается переданная ссылка (ref).
 * Она добавляет пустой текстовый узел в элемент и проверяет, является ли этот элемент активным.
 * Если элемент активен и есть выделение текста, функция извлекает текст до и после текущей позиции курсора.
 *
 * @param {React.MutableRefObject<HTMLDivElement | null>} ref - Ссылка на HTMLDivElement,
 *        для которого необходимо получить текст до и после курсора.
 * @returns {{ before: string | undefined, after: string | undefined } | undefined}
 *        - Объект с текстом до и после курсора, или undefined, если элемент не активен или нет выделения.
 */
export const splitTextByCaret = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const element = ref.current;
  if (!element) return;

  const target: Text = document.createTextNode("");
  element.appendChild(target);

  if (
    document.activeElement === element &&
    target !== null &&
    target.nodeValue !== null
  ) {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range: Range = selection.getRangeAt(0);
      const startOffset: number = range.startOffset;

      const value: string | null = element.textContent;

      if (value) {
        const before = value?.slice(0, startOffset);
        const after = value?.slice(startOffset);

        return { before, after };
      }
    }
  }
};
