import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { PutRequest } from "../../Actions/Request";
import toast from "react-hot-toast";

const textAreaStyle = {
  background: "transparent",
  color: "black",
};

const EscalateModal = ({ open, setOpen, auth, ticketId }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const esclatingTicket = async () => {
    const ok = window?.confirm("Are you sure?");
    if (ok) {
      if (!reason) {
        return toast.error("Please write reason!");
      }

      setLoading(true);
      const data = await PutRequest(
        "/escalated-ticket",
        { reason, ticketId },
        auth
      );
      if (data.ok) {
        toast.success(data.message);
        setLoading(false);
      }
    }
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
        <label>Reason, why you are escalating ticket?</label>
        <Input.TextArea
          style={textAreaStyle}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
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

export default EscalateModal;
