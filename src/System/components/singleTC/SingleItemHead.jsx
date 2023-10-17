import React from "react";
import use2ndSla from "../../../utils/use2ndSla";
import { FaTicketAlt } from "react-icons/fa";
import { Button } from "antd";

const SingleItemHead = ({
  id,
  pickedAt,
  escalatingTicket,
  from,
  single,
  setOpen2,
  resolvedTc,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="mainHeading mt-4">
        <h2>{id}</h2>
        <FaTicketAlt />
      </div>
      <div className="d-flex justify-content-between gap-3">
        {single?.movements?.length === 0 && (
          <Button className="escalated-btn" onClick={() => setOpen2(true)}>
            Handover Ticket
          </Button>
        )}
        {from !== "manager" && (
          <Button className="escalated-btn" onClick={escalatingTicket}>
            Escalate Ticket
          </Button>
        )}
        {from === "manager" && (
          <Button className="escalated-btn" onClick={escalatingTicket}>
            Assign Ticket
          </Button>
        )}
        {resolvedTc && (
          <Button
            onClick={() => {
              let ok = window?.confirm("Are you sure? You checked everthing??");
              if (ok) {
                resolvedTc();
              }
            }}
          >
            Resolved Ticket
          </Button>
        )}
      </div>
    </div>
  );
};

export default SingleItemHead;
