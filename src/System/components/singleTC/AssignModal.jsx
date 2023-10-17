import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GetRequest, PutRequest } from "../../Actions/Request";
import { Button, Input, Modal } from "antd";

const AssignModal = ({ open, setOpen, auth, ticketId, pickedBy }) => {
  const router = useNavigate();
  const [availableAgents, setAvailableAgent] = useState([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState("");
  const [agentsloading, setAgentsLoading] = useState(false);

  const esclatingTicket = async () => {
    const ok = window?.confirm("Are you sure?");
    if (ok) {
      if (!reason || !agent) {
        return toast.error(
          "Please write a reason and choose agent to handover the ticket!"
        );
      } else if (reason && agent) {
        setLoading(true);
        const data = await PutRequest(
          "/assign-ticket",
          {
            reason,
            ticketId,
            newAgentId: agent,
          },
          auth
        );
        if (data.ok) {
          toast.success(data.message);
          setLoading(false);
          router("/manager/escalate-tickets");
        }
      }
    }
  };

  useEffect(() => {
    if (auth && auth?.token) gettingAvailableTickets();
  }, [auth && auth?.token]);

  const gettingAvailableTickets = async () => {
    setAgentsLoading(true);
    const data = await GetRequest("/available-agents", auth);
    if (data.ok) {
      setAgentsLoading(false);
      setAvailableAgent(data.agents);
    }
    setAgentsLoading(false);
  };
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
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Available Agents {agentsloading && "loading..."} </label>
            <select
              className="form-control"
              name="agent"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value={""}>Choose Agent</option>
              {availableAgents?.map((x, index) => (
                <>
                  {pickedBy?._id !== x._id && (
                    <option key={index} value={x._id}>
                      {x.name}
                    </option>
                  )}
                </>
              ))}
            </select>
          </div>
        </div>
        <div style={{ width: "100px" }}>
          <Button
            className="clicks "
            onClick={esclatingTicket}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignModal;
