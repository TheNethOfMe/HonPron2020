import React, { useContext, useState, useEffect } from "react";

import MenuContext from "../../../context/menu/menuContext";
import ManageMenuCard from "./ManageMenuCard";

const ManageMenu = () => {
  const menuContext = useContext(MenuContext);
  const {
    getMenu,
    menuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
  } = menuContext;

  useEffect(() => {
    getMenu();
    console.log("Get Menu");
    // eslint-disable-next-line
  }, []);
  const createItem = (id, newItem) => {
    createMenuItem(newItem);
  };
  const updateItem = (id, itemData) => {
    updateMenuItem(id, itemData);
  };
  const deleteItem = id => {
    deleteMenuItem(id);
  };
  return (
    <div className="admin-manage">
      <h2>Manage Menu Items</h2>
      <ManageMenuCard
        item={{ _id: "new", displayText: "", menuType: "", url: "", order: "" }}
        title="Create New Menu Item"
        handleSubmit={createItem}
        handleDelete={() => {
          return "";
        }}
      />
      {menuItems.map(item => (
        <ManageMenuCard
          item={item}
          key={item._id}
          title={item.displayText}
          handleDelete={deleteItem}
          handleSubmit={updateItem}
        />
      ))}
    </div>
  );
};

export default ManageMenu;
