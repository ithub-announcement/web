import { Page } from "@/widgets/page/page.component";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NotFoundView = lazy(() => import("@/pages/notfound/ui/notfound.view"));

export const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Page
            component={<NotFoundView />}
            title="Страница не существует › Сервис объявлений"
          />
        }
      />
    </Routes>
  );
};
