import { Navbar } from "@/widgets/navbar/ui/navbar.component";
import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen max-w-[1240px] mx-auto px-4">
        <Outlet />
      </div>
    </>
  );
};
