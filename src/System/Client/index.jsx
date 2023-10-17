import React from "react";
import ClientLayout from "./components/ClientLayout";

import Breadcrumbs from "../components/Breadcrumbs";
import { IoCreate, IoHome } from "react-icons/io5";

const Client = () => {
  return (
    <ClientLayout>
      {" "}
      <Breadcrumbs
        from={"Client"}
        fromPath={"/client"}
        to={"dashboard"}
        fromIcon={<IoHome className="bread-text" />}
        toIcon={<IoCreate className="bread-text-active" />}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <div
          style={{
            padding: "0px 0px 0px 100px",
            justifyContent: "center",
            backgroundColor: "#949ff2",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
          }}
        >
          Task
        </div>

        <div
          style={{
            margin: "0px 0px 0px 50px",
            padding: "0px 0px 0px 100px",
            justifyContent: "center",
            backgroundColor: "#949ff2",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
          }}
        >
          Task
        </div>
        <div
          style={{
            margin: "0px 0px 0px 50px",
            padding: "0px 0px 0px 100px",
            justifyContent: "center",
            backgroundColor: "#949ff2",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
          }}
        >
          Task
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {" "}
        <div
          style={{
            margin: "0px 0px 0px 50px",
            padding: "0px 0px 0px 100px",
            justifyContent: "center",
            backgroundColor: "#949ff2",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
          }}
        >
          Task
        </div>
        <div
          style={{
            margin: "0px 0px 0px 50px",
            padding: "0px 0px 0px 100px",
            justifyContent: "center",
            backgroundColor: "#949ff2",
            width: "250px",
            height: "250px",
            borderRadius: "20px",
          }}
        >
          Task
        </div>
      </div>
    </ClientLayout>
  );
};

export default Client;
