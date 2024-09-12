import { Page } from "@/widgets/page/page.component";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NotFoundView = lazy(() => import("@/pages/notfound/ui/notfound.view"));
const SignInView = lazy(() => import("@/pages/sign-in/ui/sign-in.view"));

export const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/sign-in"
        element={
          <Page component={<SignInView />} title="Вход › Сервис объявлений" />
        }
      />
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
