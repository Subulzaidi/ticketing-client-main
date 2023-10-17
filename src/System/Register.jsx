import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingOutlined } from "@ant-design/icons";
import { GetRequest, PostRequest } from "./Actions/Request";
import { IoSendOutline } from "react-icons/io5";

const Register = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "",
    password: "",
    password2: "",
  });
  const [auth] = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    let data = await PostRequest("/register", formData, auth);

    if (data.ok) {
      toast.success("Create created :)");
    } else if (data.error) {
      toast.error(data.error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: "100vh" }}>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          background: "white",
          width: "700px",
          height: "100%",
          paddingTop: "50px",
        }}
      >
        <img
          src="https://www.ntaskmanager.com/wp-content/uploads/2021/09/HR-ticketing-system.jpg"
          style={{
            width: "500px",
            margin: "100px 0px 0px 50px",
            display: "flex",
            height: "200px",
            justifyContent: "center",
          }}
        />
        <span
          style={{
            display: "grid",
            justifyItems: "center",
            fontSize: "50px",
            fontFamily: "serif",
            color: "#98b7eb",
          }}
        >
          TICKETING SYSTEM
        </span>
      </div>
      <div style={{ justifyContent: "center" }}>
        <div
          style={{
            width: "550px",
            background: " #cad7ed",
            height: "500px",
            borderRadius: "20px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <main className="w-full responsive h-screen flex flex-col items-center justify-center px-4 py-4 my-5">
            <div className="text-center">
              {" "}
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl py-2">
                Register yourself!
              </h3>
              <p className="">
                Already have an Account? <Link to={"/login"}>Log in</Link>
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1"> Email</label>
                  <Input
                    type="email"
                    style={{ border: "none" }}
                    placeholder="example@hadiraza.com "
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1">Name</label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="User's name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1"> Password</label>
                  <Input
                    type="password"
                    style={{ border: "none" }}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1">Confrim Password</label>
                  <Input
                    type="password"
                    style={{ border: "none" }}
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label>
                    Choose Role<span className="text-danger">*</span>
                  </label>
                  <select
                    required
                    value={formData.role}
                    name="role"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    className="form-select"
                  >
                    <option value="">Choose</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="agent">Agent</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2"></div>
              </div>
            </div>
            <Button
              className="clicks mt-3"
              onClick={handleSubmit}
              icon={<IoSendOutline />}
            >
              Submit
            </Button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;
