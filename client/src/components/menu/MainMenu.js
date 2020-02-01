import React, { useContext, useEffect } from "react";
import MenuContext from "../../context/menu/menuContext";

const MainMenu = () => {
  const menuContext = useContext(MenuContext);
  const { menuItems, getMenu } = menuContext;
  useEffect(() => {
    getMenu();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="entry-container_main-menu">
      {menuItems.map(item => {
        return (
          <div
            key={item._id}
            className={`entry-container_menu-item ${item.menuType}`}
          >
            {item.displayText}
          </div>
        );
      })}
    </div>
  );
};

export default MainMenu;
