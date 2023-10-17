import { Layout, Menu, Grid, Drawer, Dropdown, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SideNavs from "./SideNavs";
import { AuthContext } from "../../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import Redirect from "../../../utils/Redirect";
import { BsPersonFillGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import UpdateProfileComponent from "../../components/UpdateProfileComponent";
import { AiOutlineMenu } from "react-icons/ai";
import { DefaultSider } from "../../../assets/layout";

const { Sider, Content, Header } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout = ({ children }) => {
  const router = useNavigate();
  const [open, setOpen] = useState(false);
  const breakpoints = useBreakpoint();
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [openProfile, setOpenProfile] = useState(false);

  const onClose = () => setOpen(false);

  useEffect(() => {
    if (auth && auth.token) {
      gettingCurrentAdmin();
    }
  }, [auth && auth.token]);

  const gettingCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/current-admin",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);

      if (data.ok) {
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
      icon: <BsPersonFillGear className="icon-header" />,
      onClick: () => setOpenProfile(true),
    },
    {
      key: "2",
      label: <span>Logout</span>,
      icon: <IoLogOutOutline className="icon-header" />,
      onClick: () => {
        localStorage.clear();
        setAuth({});
        router("/");
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* sidebar for just md large screens */}

      {breakpoints.md && (
        <DefaultSider>
          <Sider
            style={{
              background: "linear-gradient(45deg, #0b3d91, #000000)",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <h5 className="menu-heading mt-2 text-center">Ticketing System</h5>
            <SideNavs />
          </Sider>
        </DefaultSider>
      )}
      {/* end */}

      <Layout>
        {/* headers */}
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {!breakpoints.md && (
            <div onClick={() => setOpen(true)}>
              {" "}
              <AiOutlineMenu />
            </div>
          )}

          <h6>Welcome {auth?.user?.name}</h6>

          <Dropdown menu={{ items }}>
            <Avatar
              role="button"
              style={{
                background: "linear-gradient(45deg, #0b3d91, #000000)",
                color: "white",
              }}
            >
              {auth?.user?.name[0]}
            </Avatar>
          </Dropdown>

          <Drawer
            placement="left"
            onClose={onClose}
            open={open}
            closable={true}
            style={{
              width: "280px",
              background: "linear-gradient(45deg, #0b3d91, #000000)",
            }}
          >
            <SideNavs />
          </Drawer>
        </Header>

        {/* content */}
        <Content
          style={{
            minHeight: "80vh",
            margin: "20px",
            marginTop: "20px",
            padding: "10px",
            // background: "white",
          }}
        >
          {loading ? <Redirect /> : children}
        </Content>
      </Layout>

      <UpdateProfileComponent open={openProfile} setOpen={setOpenProfile} />
    </Layout>
  );
};

export default AdminLayout;
