import React, { useContext, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import TextEntry from "../form-parts/TextEntry";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;

  const [userFields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const [error, setError] = useState("");

  const { username, email, password, password2 } = userFields;

  const onChange = e => {
    setError("");
    setFields({ ...userFields, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords must match.");
    } else {
      registerUser(username, email, password);
    }
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Register</h2>
        <h3>Create a new Honest Piranha user account.</h3>
        {!!error && <p className="error-text">{error}</p>}
        <form onSubmit={onSubmit}>
          <TextEntry
            name="username"
            placeholder="User Name"
            value={username}
            label="User Name"
            onChange={onChange}
          />
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
          <TextEntry
            name="password2"
            type="password"
            placeholder="Verify Password"
            value={password2}
            label="Verify Password"
            onChange={onChange}
          />
          <input className="hp-form_btn" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
