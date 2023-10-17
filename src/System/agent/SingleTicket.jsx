import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AgentLayout from "./components/AgentLayout";
import { FaUserSecret } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/Auth";
import Breadcrumbs from "../components/Breadcrumbs";
import { BsCheckAll } from "react-icons/bs";
import { GetRequest, PutRequest, deleteRequest } from "../Actions/Request";

import axios from "axios";
import SingleTicketComponent from "../components/singleTC/SingleTicketComponent";

const SingleTicket = () => {
  const { id } = useParams();
  const [auth] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openEscalate, setOpenEscalate] = useState(false);
  const [currentComment, setCurrentComment] = useState({});
  const [single, setSingle] = useState({});
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [list, setList] = useState([]);
  const [comment, setcomment] = useState(
    "I have received your Ticket, I'm working on it. If you have any query please do comment below."
  );
  const gettingSingleTicket = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/by/agent/single/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setLoading(false);
      setSingle(data);
      setList(data.comments);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed, try again");
    }
  };
  useEffect(() => {
    toast.success("Please read default comment, then send!", {
      position: "bottom-center",
      icon: <BsCheckAll size={22} color="white" />,
      style: {
        borderRadius: "10px",
      },
    });

    if (auth && auth?.token) {
      gettingSingleTicket(id);
    }
  }, [auth && auth?.token, id]);

  const addcomment = async () => {
    try {
      setCommentLoading(true);
      const data = await PutRequest(
        "/by/agent/add/comment",
        {
          ticketId: id,
          content: comment,
        },
        auth
      );
      if (data.ok) {
        setList([...list, data.comments]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setCommentLoading(false);
    }
  };
  const resolvedTc = async () => {
    const data = await PutRequest(`/resolved-tc/${id}`, {}, auth);
    if (data.ok) {
      toast.success("ticket has been resolved");
    }
  };

  const deleteComment = async (x) => {
    try {
      setCommentLoading(true);
      const data = await deleteRequest(`/delete/comment/${x}`, auth);
      if (data.ok) {
        toast.success("deleted");
        setList(list.filter((i) => i._id !== x));
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setCommentLoading(false);
    }
  };
  const escalatingTicket = async () => {
    const ok = window?.confirm("Are you sure? Ticket will catch by manager!");
    if (ok) {
      setOpenEscalate(true);
    }
  };
  return (
    <AgentLayout>
      <Breadcrumbs
        fromPath={"/agent"}
        from={"Agent"}
        fromIcon={<FaUserSecret className="agent-bread-text" />}
        center={"Picked Tickets"}
        centerIcon={<CiTimer color="white" />}
        centerLink={"/agent/picked-request"}
        to={auth?.user?.name}
        toIcon={<CiTimer />}
      />
      <SingleTicketComponent resolvedTc={resolvedTc} id={id} />
    </AgentLayout>
  );
};

export default SingleTicket;
