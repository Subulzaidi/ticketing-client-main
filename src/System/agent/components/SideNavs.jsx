import { Menu } from "antd";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { CiTimer } from "react-icons/ci";

const SideNavs = () => {
  const pathname = useLocation().pathname;
  const router = useNavigate();
  return (
    <Menu
      theme="dark"
      style={{
        backgroundColor: "transparent",
      }}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
      <Menu.Item
        onClick={() => router("/agent")}
        className={`${
          pathname === "/agent" ? "dark-sidebar-navs-active" : "sidebar-navs"
        }`}
        icon={<MdOutlineDashboard />}
      >
        Dashboard
      </Menu.Item>

      <Menu.Item
        onClick={() => router("/agent/picked-request")}
        className={`mt-3 ${
          pathname === "/agent/picked-request"
            ? "dark-sidebar-navs-active"
            : "sidebar-navs"
        }`}
        icon={<CiTimer color="yellow" size={20} />}
      >
        Picked Tickets
      </Menu.Item>
    </Menu>
  );
};

export default SideNavs;
