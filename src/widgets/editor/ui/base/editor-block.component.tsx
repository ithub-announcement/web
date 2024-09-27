"use strict";

import React from "react";

export type BlockType = "heading" | "paragraph";

export type BlockProps = {
  type: BlockType;
  value: string;
};

/**
 * Block
 *
 * Компонент блока с содержанием внутри редактора объявлений.
 * Имеет два варианта отображения:
 *
 * - Heading
 * - Paragraph
 *
 * @param {BlockProps} props - Дополнительные атрибуты для настройки стилей и поведения компонента.
 */
export const Block: React.FC<BlockProps> = (
  props: BlockProps
): React.ReactElement => {
  const Selected: React.FC<BlockProps> = React.useMemo(() => {
    return {
      heading: () => <></>,
      paragraph: () => <></>,
    }[props.type];
  }, [props.type]);

  return Selected && <Selected {...props} />;
};
