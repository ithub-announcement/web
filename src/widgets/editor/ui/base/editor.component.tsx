import React from "react";

import { List } from "./editor-list.component";
import { EditorTheme } from "../theme";
import { Title } from "./editor-title.component";

type Props = {
  theme?: EditorTheme;
};

/**
 * EditorContext
 *
 * Контекст для глобального управления темой (EditorTheme) компонента Editor.
 * Позволяет дочерним компонентам получать доступ к настройкам темы и состояниям Editor
 * без необходимости передавать их через пропсы на каждом уровне.
 */
export const EditorContext = React.createContext(EditorTheme);

/**
 * Editor
 *
 * Основной компонент текстового редактора, который предоставляет интерфейс
 * для создания и редактирования статей с использованием вложенных блоков.
 *
 * Компонент позволяет пользователю добавлять различные типы контента, такие как
 * заголовки и параграфы, а также управлять их порядком. Он обеспечивает
 * интуитивно понятный интерфейс для редактирования текста, а также может быть
 * легко расширен для поддержки дополнительных типов блоков и функциональности.
 *
 * Использует глобальное состояние для управления списком блоков и их содержимым.
 *
 * @param {Props} props - Дополнительные атрибуты для настройки стилей и поведения компонента.
 * @author loseex
 */
export const Editor: React.FC<Readonly<Props>> = (
  props: Props
): React.ReactElement => {
  const theme = props.theme ?? EditorTheme;
  return (
    <EditorContext.Provider value={theme}>
      <div className={theme.base}>
        <div>
          <Title />
        </div>
        <List />
      </div>
    </EditorContext.Provider>
  );
};
