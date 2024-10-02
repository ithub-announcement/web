import { AppRouting } from "@/pages";
import { withProviders } from "./providers";
import { Toaster } from "@/shared/ui/sonner";

/**
 * App
 *
 * Основное приложение веб-части нашего проекта.
 */

export const App = withProviders((): React.ReactElement => {
  return (
    <>
      <main>
        <AppRouting />
      </main>
      <Toaster position="top-right" />
    </>
  );
});
