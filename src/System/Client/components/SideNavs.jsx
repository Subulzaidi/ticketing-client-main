import { Menu } from "antd";
import React from "react";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
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
        onClick={() => router("/client")}
        className={`mt-2  ${
          pathname === "/client" ? "sidebar-navs-active" : "sidebar-navs"
        }`}
        icon={<MdOutlineDashboard />}
      >
        {" "}
        Dashboard
      </Menu.Item>

      <Menu.Item
        onClick={() => router("/client/create-ticket")}
        className={`mt-2 ${
          pathname === "/client/create-ticket"
            ? "sidebar-navs-active"
            : "sidebar-navs"
        }`}
        icon={<MdOutlineDashboard />}
      >
        {" "}
        Create ticket
      </Menu.Item>

      <Menu.Item
        onClick={() => router("/client/open-ticket")}
        className={`${
          pathname === "/client/open-ticket"
            ? "sidebar-navs-active"
            : "sidebar-navs"
        }`}
        icon={<MdOutlineDashboard />}
      >
        Open ticket
      </Menu.Item>
    </Menu>
  );
};

export default SideNavs;
