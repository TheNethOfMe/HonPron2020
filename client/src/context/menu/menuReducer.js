import {
  GET_MENU,
  ADD_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        menuItems: action.payload
      };
    case ADD_MENU_ITEM:
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload.data]
      };
    case UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.map(menu =>
          menu._id === action.payload._id ? action.payload : menu
        )
      };
    case DELETE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter(menu => menu._id !== action.payload)
      };
    default:
      return {
        state
      };
  }
};
