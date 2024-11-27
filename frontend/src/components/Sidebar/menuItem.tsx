import React from "react";
import HomeIcon from "@/assets/home.png";
import ShoppingIcon from "@/assets/shopping.png";
import UserGroupIcon from "@/assets/usergroup.png";
import CubeIcon from "@/assets/cube.png";
import ItensIcon from "@/assets/itens.png"
import TransacaoIcon from "@/assets/transacoes.png"
import PedidosIcon from "@/assets/pedidos.png";
import VectorIcon from "@/assets/vector.png";
import ConfigIcon from "@/assets/config.png";
import ExitIcon from "@/assets/exit.png";

interface MenuItemProps {
  menu: {
    title: string;
    src: string;
    gap?: boolean;
  };
  open: boolean;
}

const iconsMap: Record<string, string> = {
  home: HomeIcon,
  shopping: ShoppingIcon,
  usergroup: UserGroupIcon,
  cube: CubeIcon,
  pedidos: PedidosIcon,
  itens: ItensIcon,
  transacoes: TransacaoIcon,
  vector: VectorIcon,
  config: ConfigIcon,
  exit: ExitIcon,
};

const MenuItem: React.FC<MenuItemProps> = ({ menu, open }) => {
  return (
    <li
      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
        ${menu.gap ? "mt-9" : "mt-2"}`}
    >
      <img src={iconsMap[menu.src]} alt={menu.title} />
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {menu.title}
      </span>
    </li>
  );
};

export default MenuItem;
