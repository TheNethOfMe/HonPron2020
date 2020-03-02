import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import queryStrToObject from "../../../utils/queryStrToObject";
import UserContext from "../../../context/users/userContext";
import ManageUserCard from "./ManageUserCard";
import Pagination from "../../entries/entry-parts/Pagination";

const ManageUsers = ({ location }) => {
  const userContext = useContext(UserContext);
  const { users, pagination, getUsers } = userContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    let query = { page };
    query = queryStrToObject(location.search, query);
    getUsers(query);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="admin-manage">
      <h2>Manage Users</h2>
      {users.map(user => (
        <ManageUserCard key={user._id} user={user} />
      ))}
      {!!Object.keys(pagination).length && (
        <Pagination
          page={page}
          pagination={pagination}
          handlePagination={setPage}
        />
      )}
    </div>
  );
};

ManageUsers.propTypes = {
  location: PropTypes.object.isRequired
};

export default ManageUsers;
