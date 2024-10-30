import React from "react";

interface MenuItemProps {
  menu: {
    title: string;
    src: string;
    gap?: boolean;
  };
  open: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, open }) => {
  return (
    <li className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
      ${menu.gap ? "mt-9" : "mt-2"}`}>
      <img src={`./src/assets/${menu.src}.png`} alt={menu.title} />
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {menu.title}
      </span>
    </li>
  );
};

export default MenuItem;
