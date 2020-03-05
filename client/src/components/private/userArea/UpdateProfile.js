import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../../../context/auth/authContext";
import TextEntry from "../../form-parts/TextEntry";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { user, updateUserDetails, updatePassword } = authContext;

  const [userFields, setFields] = useState({
    name: "",
    email: "",
    currentPass: "",
    newPass: ""
  });

  useEffect(() => {
    setFields({ ...userFields, name: user.name, email: user.email });
    // eslint-disable-next-line
  }, []);

  const { name, email, currentPass, newPass } = userFields;

  const onChange = e => {
    setFields({ ...userFields, [e.target.name]: e.target.value });
  };

  const updateUser = e => {
    e.preventDefault();
    updateUserDetails({ name, email });
  };

  const updateUserPassword = e => {
    e.preventDefault();
    updatePassword({ currentPassword: currentPass, newPassword: newPass });
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Update name/email</h2>
        <form onSubmit={updateUser}>
          <TextEntry
            name="name"
            placeholder="User Name"
            value={name}
            label="User Name"
            onChange={onChange}
          />
          <TextEntry
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            label="Email"
            onChange={onChange}
          />
          <input
            className="hp-form_btn"
            type="submit"
            value="Update Name/Password"
          />
        </form>

        <h2>Update password</h2>
        <form onSubmit={updateUserPassword}>
          <TextEntry
            name="currentPass"
            type="password"
            placeholder="Current Password"
            value={currentPass}
            label="Current Password"
            onChange={onChange}
          />
          <TextEntry
            name="newPass"
            type="password"
            placeholder="New Password"
            value={newPass}
            label="New Password"
            onChange={onChange}
          />
          <input
            className="hp-form_btn"
            type="submit"
            value="Update Password"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
