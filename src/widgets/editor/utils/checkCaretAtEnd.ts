export const checkCaretAtEnd = (
  ref: React.MutableRefObject<HTMLDivElement | null>
): void => {
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
    if (s && s.rangeCount > 0) {
      const range = s.getRangeAt(0);
      const startOffset = range.startOffset;

      const text = el.textContent;

      const textBefore = text?.slice(0, startOffset);
      const textAfter = text?.slice(startOffset);
      console.info(textBefore, "/", textAfter);
    }

    console.log(s);
  }
};
