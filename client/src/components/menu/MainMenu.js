import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuContext from "../../context/menu/menuContext";

const MainMenu = () => {
  const menuContext = useContext(MenuContext);
  const { menuItems, getMenu } = menuContext;
  useEffect(() => {
    getMenu();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="main-container_main-menu">
      {menuItems.map(item => {
        return (
          <Link
            key={item._id}
            className={`main-container_menu-item ${item.menuType}`}
            to={item.url}
          >
            {item.displayText}
          </Link>
        );
      })}
    </div>
  );
};

export default MainMenu;
