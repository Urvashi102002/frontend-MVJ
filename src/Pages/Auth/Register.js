import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "../../Styles/Auth/AuthStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = ({ sf }) => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  // let regex = new RegExp(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        name === "" ||
        email === "" ||
        password === "" ||
        phone === "" ||
        address === "" ||
        answer === ""
      ) {
        toast.error("every fild is require");
      }
      // if (!regex.test(phone) == true) {
      //   toast.error("enter correact phone number");
      // }
      axios
        .post("https://mvj.onrender.com/api/v1/auth/register", {
          name,
          email,
          password,
          phone,
          address,
          answer,
        })
        .then((res) => {
          if (res.data.message === "User register Succesfully") {
            // toast.success("Register Sucessfuly");
            console.log("data insert success");
            toast.success("User Register Sucessfully");
            history("/login");
          } else if (res.data.message === "user already register") {
            console.log("user alredy register");
            toast.error("You Already Register!");
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setAddress("");
            setAnswer("");
          } else if (res.data.message === "error in login") {
            toast.error("Server Problem !");
          }
        });
    } catch (e) {
      console.log(e);
      toast.error("something went wrong!");
    }
  };
  return (
    <div>
      <Layout>
        <div className="form-container" style={{ minHeight: "78vh" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="title">Register</h1>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputName" className="form-label">
                Name
              </label> */}
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
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
            <div className="mb-3 inputNumber" style={{}}>
              {/* <label htmlFor="exampleInputNumber" className="form-label">
                Phone
              </label> */}
              <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                placeholder="Enter Phone No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label> */}
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label> */}
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                placeholder="What is Your Favorite Sports"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
