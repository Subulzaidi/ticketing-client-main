import { Button, Space } from "antd";
import React, { useContext } from "react";
import Btn from "./Btn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const UsersBtns = () => {
  const [auth] = useContext(AuthContext);
  const path = useLocation().pathname;

  return (
    <Space className="site-button-ghost-wrapper mb-3" wrap>
      <Link to={"/admin/all-users"}>
        <Btn
          className={`${
            path === "/admin/all-users" ? "btn-active" : "btn-blue"
          }`}
        >
          All Clients
        </Btn>
      </Link>
      <Link to={"/admin/all-agents"}>
        <Btn
          className={`${
            path === "/admin/all-agents" ? "btn-active" : "btn-blue"
          }`}
        >
          All Agents
        </Btn>
      </Link>
      {auth && auth?.user?.role === "admin" && (
        <Link to="/admin/all-managers">
          <Btn
            className={`${
              path === "/admin/all-managers" ? "btn-active" : "btn-blue"
            }`}
          >
            All Managers
          </Btn>
        </Link>
      )}
      {auth && auth?.user?.role === "admin" && (
        <Link to={"/admin/all-admins"}>
          <Btn
            className={`${
              path === "/admin/all-admins" ? "btn-active" : "btn-blue"
            }`}
          >
            All Admins
          </Btn>
        </Link>
      )}
    </Space>
  );
};

export default UsersBtns;
