import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Home = () => {
  const [auth] = useContext(AuthContext);
  const router = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        background: "white",
        justifyItems: "center",
      }}
    >
      <img
        src="https://www.ntaskmanager.com/wp-content/uploads/2021/09/HR-ticketing-system.jpg"
        style={{
          width: "500px",
          margin: "100px 0px 0px 0px",
          display: "block",
          height: "200px",
          justifyContent: "center",
        }}
      />
      <span
        style={{
          fontSize: "50px",
          fontFamily: "serif",
        }}
      >
        TICKETING SYSTEM
      </span>

      <div
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <br />
        {!auth?.user && (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <p style={{ justifyContent: "center", fontSize: "20px" }}>
              Already have an account?
            </p>
            <button
              style={{
                width: "90px",
                borderRadius: "10px",
                borderColor: "#cad7ed",
                backgroundColor: " #cad7ed",
              }}
              onClick={() => router("/login")}
            >
              Login
            </button>
          </div>
        )}
        {auth.user && (
          <span
            style={{
              justifyContent: "center",
              fontSize: "20px",
              justifyItems: "center",
            }}
          >
            Welcome!!
            {auth?.user?.name}
          </span>
        )}
        <br />
        {auth && auth?.user && auth?.user?.role === "admin" && (
          <button
            style={{
              borderRadius: "20px",
              borderColor: "#cad7ed",
              backgroundColor: " #cad7ed",
            }}
            onClick={() => {
              router("/admin");
            }}
          >
            Admin Dashboard
          </button>
        )}

        {auth && auth?.user && auth?.user?.role === "agent" && (
          <button
            style={{
              width: "90px",
              borderRadius: "10px",
              borderColor: "#cad7ed",
              backgroundColor: " #cad7ed",
            }}
            onClick={() => router("/agent")}
          >
            Agent Dashboard
          </button>
        )}
        {auth && auth?.user && auth?.user?.role === "client" && (
          <button
            style={{
              borderRadius: "20px",
              borderColor: "#cad7ed",
              backgroundColor: " #cad7ed",
            }}
            onClick={() => {
              router("/client");
            }}
          >
            Client Dashboard
          </button>
        )}
        {auth && auth?.user && auth?.user?.role === "manager" && (
          <button
            style={{
              borderRadius: "20px",
              borderColor: "#cad7ed",
              backgroundColor: " #cad7ed",
            }}
            onClick={() => {
              router("/manager");
            }}
          >
            Manager Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
