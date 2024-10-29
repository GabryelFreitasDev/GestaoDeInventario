import React from "react";
import { Link } from 'react-router-dom'
import MenuItem from "./menuItem";

const Sidebar: React.FC<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ open, setOpen }) => {
  const Menus = [
    { title: "Início", src: "home", path: "/" },
    { title: "Produtos", src: "shopping", path: "/produtos", gap: true },
    { title: "Clientes", src: "user-group", path: "/clientes" },
    { title: "Fornecedores", src: "cube", path: "/fornecedores" },
    { title: "Pedidos", src: "pedidos", path: "/pedidos" },
    { title: "Relatórios", src: "vector", path: "/relatorios" },
    { title: "Configurações", src: "config", path: "/configuracoes", gap: true },
    { title: "Sair", src: "exit", path: "/logout" },
  ];

  return (
    <div className={`${open ? "w-72" : "w-20"} bg-dark-purple h-screen p-5 pt-8 relative duration-300`}>
      <img
        src="./src/assets/voltar.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.svg"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
          NOME
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <Link key={index} to={menu.path}>
            <MenuItem menu={menu} open={open} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;