import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";

import "./AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login
      try {
        const response = await axios.post("http://localhost:8001/users/login", {
          email,
          password,
        });
        login(response.data);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      // Handle signup
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);

      try {
        const response = await axios.post(
          "http://localhost:8001/users/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        login(response.data);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="auth-input"
              />
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="auth-input"
              />
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="auth-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? "Need to signup?" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
