import { ImSpinner8 } from "react-icons/im";

/**
 * Preloader
 *
 * Компонент заглушка для отображения загрузки ресурса.
 */

export const Preloader: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="flex flex-row gap-2 justify-center items-center">
        <ImSpinner8 className="text-xl animate-spin" />
      </div>
    </div>
  );
};
