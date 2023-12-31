import { React, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "../../Styles/Auth/AuthStyle.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        toast.error("every fild is require");
      }
      axios
        .post("https://mvj.onrender.com/api/v1/auth/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.success === true) {
            setAuth({ ...auth, user: res.data.user, token: res.data.token });
            localStorage.setItem("auth", JSON.stringify(res.data));
            toast.success("Login SuccessFully");
            history("/");
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Layout title={"MVJ - Login"}>
        <div className="form-container" style={{ minHeight: "78vh" }}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputEmail" className="form-label">
                Email
              </label> */}
              <input
                type="Email"
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label> */}
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="exampleInputMessage" className="form-label">
                {message}
              </label>
            </div> */}
            <div className="mb-3">
              <button
                onClick={() => history("/forgotpassword")}
                className="btn btn-primary "
              >
                Forgot Password
              </button>
            </div>
            <button type="submit" className="btn btn-primary ">
              Login
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
