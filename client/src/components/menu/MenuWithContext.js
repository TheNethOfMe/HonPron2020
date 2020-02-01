import React from "react";
import MenuState from "../../context/menu/menuState";
import MainMenu from "./MainMenu";

const MenuWithContext = () => {
  return (
    <MenuState>
      <MainMenu />
    </MenuState>
  );
};

export default MenuWithContext;
