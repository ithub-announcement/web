import React, { PropsWithChildren } from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface NavbarItemProps
  extends React.FC<
    PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
  > {}

/**
 * Navbar
 *
 * Компонент Navbar представляет собой навигационную панель,
 * предназначенную для размещения элементов навигации на веб-странице.
 * Он обеспечивает гибкую и адаптивную структуру,
 * позволяя пользователям легко перемещаться по различным разделам вашего приложения или сайта.
 *
 * @param Item Элемент навигации на веб-странице
 *
 * @author loseex
 */

const Navbar: React.FC<NavbarProps> & { Item: NavbarItemProps } = (props) => {
  return (
    <div className="w-full h-[60px] flex justify-center items-center p-3">
      <div className="w-full max-w-[1280px] px-4 flex justify-between items-center">
        <div></div>
        <div className="w-fit flex flex-row gap-3 justify-center items-center">
          {props.children}
        </div>
      </div>
    </div>
  );
};
Navbar.displayName = "Navbar";

/**
 * Navbar Item
 *
 * Это элемент навигации на веб-странице.
 *
 * todo
 *
 * @param children
 */

Navbar.Item = ({ children }): React.ReactElement => <a href="#">{children}</a>;

export { Navbar };
