import { useEffect } from "react";

/**
 * useTitle
 *
 * Hook для установки title на странице.
 *
 * @param title
 */

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
