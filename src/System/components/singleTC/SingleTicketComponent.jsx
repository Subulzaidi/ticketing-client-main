import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { BsCheckAll } from "react-icons/bs";
import { PutRequest, deleteRequest } from "../../Actions/Request";
import SingleItemHead from "./SingleItemHead";
import SingleDescription from "./SingleDescription";
import Reply from "./Reply";
import SingleComment from "./SingleComment";
import EscalateModal from "./EscalateModal";
import Handover from "./Handover";

const SingleTicketComponent = ({ resolvedTc, id, from }) => {
  const [auth] = useContext(AuthContext);
  const [open, setopen] = useState(false);
  const [open2, setopen2] = useState(false);
  const [openEscalate, setopenEscalate] = useState(false);
  const [currentComment, setCurrentComment] = useState({});
  const [single, setSingle] = useState({});
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [list, setList] = useState([]);
  const [comment, setComment] = useState(
    "I have recieved your ticket, i'm working onit. If you have any query please do comment here."
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
      toast.error("Failed! try again");
    }
  };

  useEffect(() => {
    toast.success("Please read default comment, then send!", {
      position: "bottom-center",
      icon: <BsCheckAll size={22} color="#99196a" />,
      style: {
        borderRadius: "10px",
        background: "transparent",
        color: "white",
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
      setopenEscalate(true);
    }
  };

  return (
    <>
      <SingleItemHead
        from={from}
        resolvedTc={resolvedTc}
        id={id}
        pickedAt={single?.pickedAt}
        escalatingTicket={escalatingTicket}
        setOpen2={setopen2}
      />
      <SingleDescription single={single} from={from} />
      <SingleComment
        commentLoading={commentLoading}
        comment={comment}
        setComment={setComment}
        addComment={addcomment}
        deleteComment={deleteComment}
        auth={auth}
        list={list}
        setOpen={setopen}
        setCurrentComment={setCurrentComment}
      />
      <Reply
        open={open}
        setOpen={setopen}
        currentComment={currentComment}
        list={list}
        auth={auth}
      />
      <EscalateModal
        open={openEscalate}
        setOpen={setopenEscalate}
        auth={auth}
        ticketId={id}
      />
      <Handover open={open2} setOpen={setopen2} auth={auth} ticketId={id} />
    </>
  );
};

export default SingleTicketComponent;
