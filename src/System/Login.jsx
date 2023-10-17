import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, Form, Input, Grid } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;
const Login = () => {
  const breakpoints = useBreakpoint();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/login", values);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully logged in");
        setLoading(false);

        router("/");
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (auth && auth?.token) {
      router("/");
    }
  }, [auth, router]);

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
          <main className="w-full responsive h-screen flex flex-col items-center justify-center px-4 my-5">
            <div className="max-w-sm w-full text-gray-600 py-2">
              <div className="text-center">
                <div className="mt-5 space-y-2 ">
                  <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl py-2">
                    Log in to your account
                  </h3>
                  <p className="">
                    Don't have an account?{" "}
                    <Link to={"/signup"}>Register yourself</Link>
                  </p>
                </div>
              </div>
              {loading && <LoadingOutlined className="loading" />}

              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  margin: "100px 0px 0px -120px",

                  maxWidth: 600,
                  display: "block ",
                  justifyContent: "center",
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
