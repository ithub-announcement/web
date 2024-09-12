import { AppComponent, CoreConfiguration } from "./core";
import ReactDOM from "react-dom/client";

/**
 * Core
 *
 * Ядро веб-приложения.
 *
 * @author Чехонадских Дмитрий
 * @author Власенко Дмитрий
 */

export class Core {
  /**
   * Конфигурация ядра приложения.
   */

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
   * Метод для отправки http запроса до рендера приложения.
   *
   * @param input
   * @param init
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
   * mount
   *
   * Метод для рендера приложения.
   *
   * @param DomNode
   */

  private mount(DomNode: HTMLDivElement): void {
    const { AppComponent } = this.configuration;
    this.configuration.AppReactDOM = ReactDOM.createRoot(DomNode);
    this.configuration.AppReactDOM.render(AppComponent());
  }

  /**
   * setup
   *
   * Метод для запуска ядра приложения.
   *
   * @param component
   */

  public static setup(component: AppComponent) {
    const core = new Core(component);
    const { AppDOMNode } = core.configuration;

    core.mount(AppDOMNode());

    return void 0;
  }
}
