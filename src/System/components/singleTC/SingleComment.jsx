import { Avatar, Button, Input, List } from "antd";
import Card from "antd/es/card/Card";
import React from "react";

const SingleComment = ({
  commentLoading,
  comment,
  setComment,
  addComment,
  deleteComment,
  list,
  auth,
  setOpen,
  setCurrentComment,
}) => {
  return (
    <>
      <Card className="mt-2">
        <div className="row">
          <div className="col-md-11">
            <Input.TextArea
              style={{ fontWeight: "600" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="col-md-1 mt-2">
            <Button
              loading={commentLoading}
              className="clicks"
              onClick={addComment}
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
      <List
        className=" mt-2 p-2"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <span
                className="text-black"
                role="button"
                onClick={() => {
                  setOpen(true);
                  setCurrentComment(item); // single comment: Item {content: "hello", _id : "aslkdjsakh3i242"}
                }}
              >
                reply
              </span>,
              <>
                {item.createdBy === auth?.user?._id && (
                  <a
                    className="text-danger"
                    onClick={() => deleteComment(item._id)}
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
    </>
  );
};

export default SingleComment;
