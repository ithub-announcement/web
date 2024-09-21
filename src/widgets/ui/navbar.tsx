import React, { useContext } from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: NavbarTheme;
}
export interface NavbarSectionProps
  extends React.HTMLAttributes<HTMLUListElement> {}
export interface NavbarItemProps
  extends React.HtmlHTMLAttributes<HTMLLIElement> {}
export interface NavbarBrandProps
  extends React.HTMLAttributes<HTMLDivElement & HTMLImageElement> {
  src: string;
  href?: string;
  alt?: string;
}
export type NavbarTheme = {
  base: string;
  inner: string;
  list: string;
  brand: string;
};

/**
 * NavbarTheme
 *
 * Объект, содержащий стили для компонента Navbar.
 * Включает базовые и внутренние стилевые классы, а также стили для списка элементов.
 *
 * - base: Общие стили, задающие размеры, размещение и отступы для всего Navbar.
 * - inner: Стилевые классы для центральной области Navbar, определяющие максимальную ширину и выравнивание элементов.
 * - list: Стилевые классы для горизонтального списка элементов, позволяющие настраивать отступы между ними.
 *
 * @default
 */
const NavbarTheme: NavbarTheme = {
  base: "w-full h-[60px] flex justify-center items-center p-3",
  inner: "w-full max-w-[1280px] px-4 flex justify-between items-center",
  list: "flex flex-row gap-3",
  brand: "w-fit h-9",
};

/**
 * NavbarContext
 *
 * Контекст для глобального управления темой (NavbarTheme) компонента Navbar.
 * Позволяет дочерним компонентам получать доступ к настройкам темы и состояниям Navbar
 * без необходимости передавать их через пропсы на каждом уровне.
 */
const NavbarContext = React.createContext(NavbarTheme);

/**
 * Navbar
 *
 * Компонент Navbar представляет собой навигационную панель,
 * предназначенную для размещения элементов навигации на веб-странице.
 * Он обеспечивает гибкую и адаптивную структуру,
 * позволяя пользователям легко перемещаться по различным разделам вашего приложения или сайта.
 *
 * @param props - Дополнительные атрибуты для настройки стилей и поведения компонента.
 *
 * @author loseex
 */
const NavbarComponent: React.FC<NavbarProps> = ({
  children,
  className,
  ...props
}): React.ReactElement => {
  const theme = props.theme ?? NavbarTheme;
  return (
    <NavbarContext.Provider value={theme}>
      <nav
        className={`${theme.base}${
          className !== undefined ? " " + className : ""
        }`}
        {...props}
      >
        <div className={theme.inner} children={children} />
      </nav>
    </NavbarContext.Provider>
  );
};
NavbarComponent.displayName = "Navbar";

/**
 * NavbarItem
 *
 * Компонент NavbarItem оборачивает дочерние элементы секции в тег <li>.
 * Это позволяет легко добавлять элементы навигации в секцию,
 * сохраняя при этом единообразный стиль и структуру.
 *
 * @param props - Дополнительные атрибуты для настройки стилей и поведения компонента.
 */
const NavbarItem: React.FC<NavbarItemProps> = (props): React.ReactElement => (
  <li children={props.children} {...props} />
);
NavbarItem.displayName = "Navbar.Item";

/**
 * NavbarSection
 *
 * Компонент NavbarSection представляет собой секцию компонентов на Navbar.
 * Он используется для группировки элементов навигации в отдельные секции,
 * обеспечивая более организованное представление навигационных элементов.
 *
 * @param props - Дополнительные атрибуты для настройки стилей и поведения компонента.
 */
const NavbarSection: React.FC<NavbarSectionProps> = ({
  children,
  ...props
}): React.ReactElement => {
  const theme = React.useContext(NavbarContext);
  /**
   * Момент обертки всех children в тег.
   */
  const updated = React.useMemo(
    () =>
      React.Children.map(children, (child: React.ReactNode) => (
        <Navbar.Item children={child} />
      )),
    [children]
  );
  return <ul className={theme.list} children={updated} {...props} />;
};
NavbarSection.displayName = "Navbar.Section";

/**
 * NavbarBrand
 *
 * Компонент для отображения логотипа на компоненте Navbar.
 * При помощи этого компонента можно перейти на главную страницу.
 */
const NavbarBrand: React.FC<NavbarBrandProps> = ({
  className,
  ...props
}): React.ReactElement => {
  const theme = useContext(NavbarContext);
  return (
    <a href={props.href ?? "/"}>
      <img
        className={`${theme.brand} ${
          className !== undefined ? " " + className : ""
        }`}
        src={props.src}
        loading="lazy"
        alt={props.alt ?? "Navbar Brand Logotype"}
      />
    </a>
  );
};
NavbarBrand.displayName = "Navbar.Brand";

/**
 * Navbar
 *
 * Основной компонент, объединяющий NavbarComponent, NavbarSection, NavbarBrand и NavbarItem,
 * позволяя легко создавать адаптивные навигационные панели с использованием вложенной структуры.
 */
export const Navbar = Object.assign(NavbarComponent, {
  Section: NavbarSection,
  Item: NavbarItem,
  Brand: NavbarBrand,
});
