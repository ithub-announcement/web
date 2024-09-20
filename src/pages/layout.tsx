import { Outlet } from "react-router-dom";

/**
 * RootLayout
 *
 * Это основной компонент макета приложения, который оборачивает все остальные компоненты.
 */

const RootLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
