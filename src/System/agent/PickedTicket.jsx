import React, { useContext, useEffect, useState } from "react";
import AgentLayout from "./components/AgentLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import { FaTicketAlt, FaUserSecret } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { GetRequest } from "../Actions/Request";
import { AuthContext } from "../../context/Auth";
import PickedTicketItems from "./components/PickedTicketItem";

const PickedTickets = () => {
  const [auth] = useContext(AuthContext);
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(false);

  const gettingPickTickets = async () => {
    setLoading(true);
    const data = await GetRequest("/by/agent/picks", auth);
    if (data.ok) {
      setLoading(false);
      setPicks(data.tickets);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) gettingPickTickets();
  }, [auth && auth?.token]);

  return (
    <AgentLayout>
      <Breadcrumbs
        from={"Agent"}
        fromIcon={<FaUserSecret className="agent-bread-text" />}
        to={"Picked Tickets"}
        toIcon={<CiTimer />}
      />

      <div className="mainHeading mt-4">
        <h2>Development Category Tickets</h2>
        <FaTicketAlt />
      </div>

      <div className="table-responsive">
        <table className="table mt-1 agent-table">
          <thead>
            <tr>
              <th scope="col"># {loading && "loading"}</th>
              <th scope="col">Title</th>
              <th scope="col">Picket At</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col ">1st SLA</th>
              <th scope="col ">2nd SLA</th>
              <th scope="col "></th>
            </tr>
          </thead>

          <tbody>
            {picks.map((x, index) => (
              <PickedTicketItems x={x} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </AgentLayout>
  );
};

export default PickedTickets;
