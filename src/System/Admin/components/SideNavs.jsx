import { Menu } from "antd";
import React from "react";
import {
  MdOutlineCategory,
  MdOutlineCreate,
  MdOutlineDashboard,
} from "react-icons/md";
import { PiUsersLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavs = () => {
  const router = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <Menu
      theme="dark"
      style={{
        height: "100%",
        color: "white",
        backgroundColor: "transparent",
      }}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
    
      <Menu.Item
        onClick={() => router("/admin")}
        className={`${
          pathname === "/admin" ? "sidebar-navs-active" : "sidebar-navs"
        }`}
        icon={<MdOutlineDashboard />}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        onClick={() => router("/admin/all-users")}
        className={`mt-3 ${
          pathname === "/admin/all-users"
            ? "sidebar-navs-active"
            : "sidebar-navs"
        }`}
        icon={<PiUsersLight />}
      >
        All Users
      </Menu.Item>
      <Menu.Item
        onClick={() => router("/admin/create-account")}
        className={`${
          pathname === "" ? "sidebar-navs-active" : "sidebar-navs"
        }`}
        icon={<MdOutlineCreate />}
      >
        Create Account
      </Menu.Item>
      <Menu.Item
        onClick={() => router("/admin/category")}
        className={`mt-3 ${
          pathname === "" ? "sidebar-navs-active" : "sidebar-navs"
        }`}
        icon={<MdOutlineCategory />}
      >
        Category
      </Menu.Item>{" "}
      <Menu.Item
        className={`${
          pathname === "" ? "sidebar-navs-active" : "sidebar-navs"
        }`}
      >
        Agents
      </Menu.Item>
      <Menu.Item
        className={`${
          pathname === "" ? "sidebar-navs-active" : "sidebar-navs"
        }`}
      >
        Clients
      </Menu.Item>
    </Menu>
  );
};

export default SideNavs;
