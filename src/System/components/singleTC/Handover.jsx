import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GetRequest, PutRequest } from "../../Actions/Request";
import { Button, Input, Modal } from "antd";

const Handover = ({ open, setOpen, auth, ticketId }) => {
  const router = useNavigate();
  const [availableAgents, setAvailableAgents] = useState([]);
  const [reason, setreason] = useState("");
  const [loading, setloading] = useState(false);
  const [agent, setagent] = useState("");
  const [agentsLoading, setagentsLoading] = useState(false);

  const escalatingTicket = async () => {
    let ok = window?.confirm("Are you sure?");
    if (ok) {
      if (!reason || !agent) {
        return toast.error(
          "Please write reason and choose agent to handover this ticket!"
        );
      } else if (reason && agent) {
        setloading(true);
        const data = await PutRequest(
          "/handover-ticket",
          { reason, ticketId, newAgentId: agent },
          auth
        );
        if (data.ok) {
          toast.success(data.message);
          setloading(false);
          router("/agent/picked-request");
        }
      }
    }
  };

  const gettingAvailableTickets = async () => {
    setagentsLoading(false);
    const data = await GetRequest("/available-agents", auth);
    if (data.ok) {
      setAvailableAgents(data.agents);
      setagentsLoading(false);
    }
    setagentsLoading(false);
  };

  useEffect(() => {
    if (auth && auth?.token) gettingAvailableTickets();
  }, [auth && auth?.token]);
  return (
    <Modal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
      className="my-custom-modal"
    >
      <div className="d-flex flex-column align-items-start gap-2">
        <label>Reason, why you are giving this ticket?</label>
        <Input.TextArea
          value={reason}
          onChange={(e) => setreason(e.target.value)}
        />

        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Available Agents {agentsLoading && "loading..."} </label>
            <select
              className="form-control"
              name="agent"
              value={agent}
              onChange={(e) => setagent(e.target.value)}
            >
              <option value={""}>Choose Agent</option>
              {availableAgents?.map((x, index) => (
                <option key={index} value={x._id}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ width: "100px" }}>
          <Button
            className="clicks "
            onClick={escalatingTicket}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Handover;
