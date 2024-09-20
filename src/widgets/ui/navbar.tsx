import React from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface NavbarSectionProps
  extends React.HTMLAttributes<HTMLUListElement> {}
export interface NavbarItemProps
  extends React.HtmlHTMLAttributes<HTMLLIElement> {}

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
const NavbarComponent: React.FC<NavbarProps> = (props): React.ReactElement => {
  return (
    <div
      className="w-full h-[60px] flex justify-center items-center p-3"
      {...props}
    >
      <div
        className="w-full max-w-[1280px] px-4 flex justify-between items-center"
        children={props.children}
      />
    </div>
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
const NavbarItem: React.FC<NavbarItemProps> = (props) => (
  <li children={props.children} />
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
const NavbarSection: React.FC<NavbarSectionProps> = (
  props
): React.ReactElement => {
  /**
   * Момент обертки всех children в тег.
   */
  const updated = React.Children.map(props.children, (child) => (
    <Navbar.Item children={child} />
  ));
  return <ul className="flex flex-row gap-3" children={updated} />;
};
NavbarSection.displayName = "Navbar.Section";

/**
 * Navbar
 *
 * Основной компонент, объединяющий NavbarComponent, NavbarSection и NavbarItem,
 * позволяя легко создавать адаптивные навигационные панели с использованием вложенной структуры.
 */
export const Navbar = Object.assign(NavbarComponent, {
  Section: NavbarSection,
  Item: NavbarItem,
});
