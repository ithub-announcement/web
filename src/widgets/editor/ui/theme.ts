export type EditorTheme = {
  base: string;
  list: string;
  title: string;
};

/**
 * EditorTheme
 *
 * Объект, содержащий стили для компонента Editor.
 * Включает базовые и внутренние стилевые классы, а также стили для списка элементов.
 *
 * @default
 */
export const EditorTheme: EditorTheme = {
  base: "w-full min-h-fit",
  list: "flex flex-col space-y-10",
  title: "w-full h-fit text-4xl font-extrabold outline-none relative",
};
