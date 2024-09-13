import { Avatar, AvatarImage } from "@/widgets/ui/avatar";
import { Button } from "@/widgets/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/widgets/ui/tooltip";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[60px] bg-white flex flex-row justify-center items-center">
      <div className="w-full max-w-[1240px] h-full px-4 flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Button variant="link" onClick={() => navigate("/")}>
            <span>Главная</span>
          </Button>
          <Button variant="link" onClick={() => navigate("/drafts")}>
            <span>Черновики</span>
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" onClick={() => navigate("/editor")}>
                  <VscAdd />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Создать пост</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar className="cursor-pointer active:scale-90 transition">
            <AvatarImage src="https://avatars.githubusercontent.com/u/112265709?v=4" />
          </Avatar>
        </div>
      </div>
    </div>
  );
};
