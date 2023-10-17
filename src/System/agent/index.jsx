import React, { useContext, useEffect, useState } from "react";
import AgentLayout from "./components/AgentLayout";
import { Button, Table } from "antd";
import { IoHome, IoReload } from "react-icons/io5";
import Breadcrumbs from "../components/Breadcrumbs";
import toast from "react-hot-toast";
import { GetRequest } from "../Actions/Request";
import { AuthContext } from "../../context/Auth";
import AgentOpenTicketItem from "./components/AgentOpenTicketItem";
import axios from "axios";

const Agent = () => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [pickedLoading, setPickedLoading] = useState(false);
  const [list, setList] = useState([]);

  const gettingListByCategory = async () => {
    setLoading(true);
    let data = await GetRequest("/by/agent/category/list", auth);
    console.log(data);
    if (data.ok) {
      setLoading(false);
      setList(data.tickets);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      gettingListByCategory();

      const interval = setInterval(() => {
        gettingListByCategory();
      }, 2 * 60 * 1000); // 2 minutes in milliseconds

      // Clear the interval when the component is unmounted
      return () => clearInterval(interval);
    }
  }, [auth && auth.token]);

  const pickedTicket = async (tcID) => {
    setPickedLoading(true);
    try {
      const { data } = await axios.put(
        "/by/agent/pick",
        { ticketId: tcID },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      toast.success("Picked");
      gettingListByCategory(); // list rerender
      setPickedLoading(false);
    } catch (error) {
      console.log(error);
      setPickedLoading(false);
      toast.error("Failed, try again");
    }
  };

  return (
    <AgentLayout>
      <Breadcrumbs
        from={"Agent"}
        fromIcon={<IoHome className="agent-bread-text" />}
      />
      <div className="d-flex justify-content-end ">
        <Button className="dark-clicks" icon={<IoReload />}>
          reload
        </Button>
      </div>

      <small className="text-secondary">
        Red background means, 1st SLA has breached
      </small>
      {/* table-responsive */}
      <div className="table-responsive">
        <table className="table mt-3 agent-table">
          <thead>
            <tr>
              <th scope="col"># {loading && "loading"}</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col ">Timer</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {list?.map((x, index) => (
              <AgentOpenTicketItem
                x={x}
                index={index}
                pickedTicket={pickedTicket}
              />
            ))}
          </tbody>
        </table>
      </div>
    </AgentLayout>
  );
};

export default Agent;
