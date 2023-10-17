import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { Button, Card, Input, Select } from "antd";
import { IoCreate, IoHome, IoSendOutline } from "react-icons/io5";
import Breadcrumbs from "../components/Breadcrumbs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AuthContext } from "../../context/Auth";
import { GetRequest, PostRequest } from "../Actions/Request";
import toast from "react-hot-toast";

const data = [
  { name: "Mon", accounts: 3 },
  { name: "Tue", accounts: 4 },
  { name: "Wed", accounts: 2 },
  { name: "Thu", accounts: 5 },
  { name: "Fri", accounts: 3 },
  { name: "Sat", accounts: 3 },
  { name: "Sun", accounts: 3 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: "5px",
          color: "#0b3d91",
          border: "1px solid #0b3d91",
          background: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <p>{`${payload[0].value} accounts on ${payload[0].payload.name}`}</p>
      </div>
    );
  }
  return null;
};

const { Option } = Select;

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    category: "",
    role: "",
    password: "",
    password2: "",
  });
  const [auth] = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getData = async () => {
    const data = await GetRequest("all/categories", auth);
    setCategories(data.categories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    let data = await PostRequest("/register/a/user", formData, auth);

    if (data.ok) {
      toast.success("Create created :)");
    } else if (data.error) {
      toast.error(data.error);
    }
  };

  const totalAccounts = data.reduce((acc, curr) => acc + curr.accounts, 0);

  useEffect(() => {
    getData();
  }, [auth && auth?.token]);

  return (
    <AdminLayout>
      <Breadcrumbs
        from={"Admin"}
        fromPath={"/admin"}
        to={"Create Account"}
        fromIcon={<IoHome className="bread-text" />}
        toIcon={<IoCreate className="bread-text-active" />}
      />
      <Card
        className="cardStyle mt-3"
        // style={{ background: "linear-gradient(45deg, #0b3c913a, #00000033)" }}
      >
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
            <div className="form-group py-2">
              <label>
                Choose Category<span className="text-danger">*</span>{" "}
              </label>
              <select
                required
                value={formData.category}
                name="category"
                onChange={handleChange}
                style={{ width: "100%" }}
                className="form-select"
              >
                <option value="">Choose</option>
                {categories.map((x, index) => (
                  <option key={index} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Button
          className="clicks mt-3"
          onClick={handleSubmit}
          icon={<IoSendOutline />}
        >
          Submit
        </Button>
      </Card>

      <div className="d-flex gap-3">
        <div
          style={{
            width: "50%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            background: "linear-gradient(45deg, #000000 ,#0b3d91)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong>{totalAccounts}</strong> agents accounts created
          </div>
          <div style={{ width: "40%", height: 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="accounts"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            background: "linear-gradient(45deg, #000000 ,#0b3d91)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong>{totalAccounts}</strong> manager accounts created
          </div>
          <div style={{ width: "40%", height: 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="accounts"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateAccount;
