import { Page } from "@/widgets/page/page.component";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RootLayout = lazy(() => import("@/pages/layout"));

const NotFoundView = lazy(() => import("@/pages/notfound/ui/notfound.view"));
const SignInView = lazy(() => import("@/pages/sign-in/ui/sign-in.view"));
const EditorView = lazy(() => import("@/pages/editor/ui/editor.view"));

export const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}></Route>
      <Route path="/editor">
        <Route
          index
          element={<Page component={<EditorView />} title="Редактор" />}
        />
      </Route>
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
