import styled from "styled-components";
import { Layout } from "antd";
const { Sider, Header, Content, Footer } = Layout;

const DefaultHeader = styled(Header)`
  width: 100%;
  backgroundcolor: white !important;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 20px;
`;

const DefaultSider = styled(Sider)`
  background: linear-gradient(45deg, #0b3d91, #000000) !important;
  overflow: auto;
  height: 100vh !important;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

const DefaultContent = styled(Content)`
  min-height: 80vh;
  margin: 20px;
  margin-top: 20px;
  padding: 20px;
  background: white;
`;

const DefaultFooter = styled(Footer)``;

export { DefaultHeader, DefaultSider, DefaultContent, DefaultFooter };
