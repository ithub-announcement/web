import env from "../config.env";
import { AppComponent, CoreConfiguration } from "./core";
import ReactDOM from "react-dom/client";

/**
 * Core
 *
 * Ядро веб-приложения, отвечающее за инициализацию и управление основными компонентами.
 *
 * @author Чехонадских Дмитрий
 * @author Власенко Дмитрий
 */

export class Core {
  private configuration: CoreConfiguration = {
    AppComponent: () => void 0,
    AppDOMNode: () => document.getElementById("root") as HTMLDivElement,
    AppReactDOM: null,
  };

  constructor(component: AppComponent) {
    this.configuration.AppComponent = component;
    console.info(
      "Core::%cCore is enabled.",
      "background: #222; color: #bada55"
    );
  }

  /**
   * makeCall
   *
   * Выполняет HTTP-запрос с указанными параметрами.
   * Обрабатывает ошибки, возникающие при выполнении запроса.
   *
   * @param input - URL или объект Request для выполнения запроса.
   * @param init - Опциональные параметры для конфигурации запроса.
   * @returns Обещание, содержащее ответ сервера.
   */
  private async makeCall(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    try {
      return await fetch(input, init);
    } catch (e) {
      throw new Error(e as string);
    }
  }

  /**
   * validateClientAuthorization
   *
   * Проверяет действительность токена доступа.
   * Если токен недействителен, он удаляется из локального хранилища.
   *
   */
  private async validateClientAuthorization() {
    try {
      const token: string | null = localStorage.getItem("access");
      if (!token) return;

      await this.makeCall(`${env.api.baseUrl}/users/api/v1/auth/validate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access: token,
        }),
      }).then((r) => r.status == 400 && localStorage.removeItem("access"));
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * mount
   *
   * Монтирует компонент приложения в указанный DOM-узел.
   *
   * @param DomNode - Узел DOM, в который будет смонтирован компонент приложения.
   */
  private mount(DomNode: HTMLDivElement): void {
    const { AppComponent } = this.configuration;
    this.configuration.AppReactDOM = ReactDOM.createRoot(DomNode);
    this.configuration.AppReactDOM.render(AppComponent());
  }

  /**
   * setup
   *
   * Статический метод для настройки ядра приложения.
   * Выполняет проверку авторизации и монтирует компонент приложения.
   *
   * @param component - Компонент приложения, который будет рендериться.
   */
  public static setup(component: AppComponent) {
    const core = new Core(component);
    const { AppDOMNode } = core.configuration;

    core.validateClientAuthorization();
    core.mount(AppDOMNode());

    return void 0;
  }
}
