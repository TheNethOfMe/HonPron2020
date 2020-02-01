import React, { useContext, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import TextEntry from "../form-parts/TextEntry";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;

  const [userFields, setFields] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userFields;

  const onChange = e => {
    setFields({ ...userFields, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      console.log("YOU NEED AN EMAIL AND PASSWORD.");
    } else {
      loginUser(email, password);
    }
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Login</h2>
        <h3>Sign into your Honest Piranha user account.</h3>
        <form onSubmit={onSubmit}>
          <TextEntry
            name="email"
            placeholder="Email"
            value={email}
            label="Email"
            onChange={onChange}
          />
          <TextEntry
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            label="Password"
            onChange={onChange}
          />
          <input className="hp-form_btn" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
