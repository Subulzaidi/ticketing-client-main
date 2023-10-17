import React from "react";
import AdminLayout from "./components/AdminLayout";
import AllUsersComponent from "../components/AllUsersComponent";
import Breadcrumbs from "../components/Breadcrumbs";
import { IoCreate, IoHomeSharp } from "react-icons/io5";
const AllAgent = () => {
  return (
    <AdminLayout>
      {" "}
      <Breadcrumbs
        from={"Admin"}
        fromPath={"/admin"}
        to={"All Agents"}
        fromIcon={<IoHomeSharp className="bread-text" />}
        toIcon={<IoCreate className="bread-text-active" />}
      />
      <AllUsersComponent heading={"All Agents"} url={"/all-agent"} />
    </AdminLayout>
  );
};

export default AllAgent;
