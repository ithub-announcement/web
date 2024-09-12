import { useTitle } from "@/shared/hooks/react/useTitle.hook";

/**
 * Page
 *
 * Компонент обертки для страницы.
 *
 * @param component
 * @param title
 */

export const Page: React.FC<{ component: React.ReactNode; title: string }> = ({
  component,
  title,
}) => {
  useTitle(title);
  return component;
};
