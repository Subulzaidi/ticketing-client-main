import { Menu } from "antd";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SideNavs = () => {
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
      <Menu.Item className="sidebar-navs" icon={<MdOutlineDashboard />}>
        Dashboard
      </Menu.Item>
    </Menu>
  );
};

export default SideNavs;
