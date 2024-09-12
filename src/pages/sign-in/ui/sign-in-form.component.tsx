import { Button } from "@/widgets/ui/button";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAuhtorzationClientMutation } from "../api/sign-in.api";
import { toast } from "sonner";
import { VscBracketError } from "react-icons/vsc";
import { ImSpinner8 } from "react-icons/im";

export const SignInForm: React.FC = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [request, { isLoading, isError }] = useAuhtorzationClientMutation();

  const isDisableForm = !state.username || !state.password;

  useEffect(() => {
    if (isError)
      toast("Ошибка авторизации", {
        description: "Ошибка в запросе на сервер.",
        icon: <VscBracketError className="text-xl" />,
        duration: 5000,
      });
  }, [isError]);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    request(state);
  };

  return (
    <form className="w-full pb-20 text-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-10">
        <input
          type="text"
          className="w-full border border-gray-50 bg-gray-100 focus:bg-white focus:border-[#9b7ef1] transition rounded-md p-3 placeholder:text-[#a2a2a3] focus:outline-none"
          name="username"
          placeholder="Логин"
          value={state.username}
          onChange={(ev) =>
            setState((prev) => ({ ...prev, username: ev.target.value }))
          }
          disabled={isLoading}
        />
        <div className="w-full relative">
          <input
            type={!showPassword ? "password" : "text"}
            className="w-full border border-gray-50 bg-gray-100 focus:bg-white focus:border-[#9b7ef1] transition rounded-md p-3 placeholder:text-[#a2a2a3] focus:outline-none"
            name="password"
            placeholder="Пароль"
            value={state.password}
            onChange={(ev) =>
              setState((prev) => ({ ...prev, password: ev.target.value }))
            }
            disabled={isLoading}
          />
          <Button
            variant="ghost"
            className="absolute right-0 h-full hover:bg-transparent"
            onClick={handleShowPassword}
            type="button"
          >
            <span className="text-xl">
              {!showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <Button
          type="submit"
          className="w-full bg-[#835de1] hover:bg-[#9b7ef1] text-white transition py-6"
          disabled={isDisableForm || isLoading}
        >
          {isLoading ? (
            <ImSpinner8 className="text-sm animate-spin" />
          ) : (
            <span className="text-sm">Войти</span>
          )}
        </Button>
      </div>
      <a
        href="https://t.me/loseex"
        target="_blank"
        className="text-center text-[#835de1] hover:opacity-80 transition"
      >
        Не можете войти?
      </a>
    </form>
  );
};
