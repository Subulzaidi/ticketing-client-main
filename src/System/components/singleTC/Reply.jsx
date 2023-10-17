import { Avatar, Button, Card, Input, List, Modal } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PostRequest, PutRequest } from "../../Actions/Request";
import axios from "axios";

const Reply = ({ open, setOpen, currentComment, list, auth }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState([]);

  const gettingReplies = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/replies/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        setReplies(data._replies);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed, try again");
    }
  };

  // useEffect(() => {
  //   if (auth && auth?.token) {
  //     gettingReplies(currentComment._id);
  //     console.log(currentComment._id);
  //   }
  // }, [auth && auth?.token, currentComment._id]);

  const addReply = async () => {
    try {
      setLoading(true);
      const data = await PostRequest(
        "/add/reply",
        {
          commentId: currentComment._id,
          content: comment,
        },
        auth
      );
      if (data.ok) {
        setReplies([...replies, data._reply]);
        setComment("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const deleteReply = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/remove/reply/${x}`, auth, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log("here is hte data", data);
      if (data.ok) {
        toast.success("removed");
        setReplies(replies.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={currentComment.content}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
      className="my-custom-modal"
    >
      <Card className="blackCard  mt-2">
        <div className="row">
          <div className="col-md-11">
            <Input.TextArea
              style={{
                backgroundColor: "transparent",
                color: "black",
                fontWeight: "600",
              }}
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="col-md-1 mt-2">
            <Button loading={loading} className="clicks" onClick={addReply}>
              Submit
            </Button>
          </div>
        </div>
      </Card>

      <List
        style={{ borderRadius: "10px" }}
        className=" mt-2 p-2"
        itemLayout="horizontal"
        dataSource={replies}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <>
                {item.createdBy === auth?.user?._id && (
                  <a
                    className="text-danger"
                    onClick={() => deleteReply(item._id)}
                  >
                    delete
                  </a>
                )}
              </>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a className="text-black">{item.createdBy}</a>}
              description={[<span className="text-black">{item.content}</span>]}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default Reply;
