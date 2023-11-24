import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (res && res.data?.success) {
        const token1 = res.data?.token;
        console.log(token1);

        localStorage.setItem("token", token1);

        navigate("/home");
      } else {
        // Handle login failure
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-5">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
