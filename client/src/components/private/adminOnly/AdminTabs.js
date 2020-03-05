import React from "react";
import PropTypes from "prop-types";

const AdminTabs = ({ tab, tabSelect, tabList }) => {
  return (
    <div className="admin-tabs">
      {tabList.map(tabListItem => (
        <button
          key={`at-${tabListItem}`}
          onClick={() => tabSelect(tabListItem)}
          className={
            tab === tabListItem
              ? "hp-btn admin-tab-btn selected"
              : "hp-btn admin-tab-btn"
          }
        >
          {tabListItem}
        </button>
      ))}
    </div>
  );
};

AdminTabs.propTypes = {
  tab: PropTypes.string.isRequired,
  tabSelect: PropTypes.func.isRequired,
  tabList: PropTypes.array.isRequired
};

export default AdminTabs;

// <button
//         onClick={() => tabSelect("open")}
//         className={tab === "open" ? "admin-tab-btn selected" : "admin-tab-btn"}
//       >
//         Open
//       </button>
//       <button
//         onClick={() => tabSelect("closed")}
//         className={
//           tab === "closed" ? "admin-tab-btn selected" : "admin-tab-btn"
//         }
//       >
//         Closed
//       </button>
//       <button
//         onClick={() => tabSelect("yellow")}
//         className={
//           tab === "yellow" ? "admin-tab-btn selected" : "admin-tab-btn"
//         }
//       >
//         Yellow
//       </button>
//       <button
//         onClick={() => tabSelect("red")}
//         className={tab === "red" ? "admin-tab-btn selected" : "admin-tab-btn"}
//       >
//         Red
//       </button>
