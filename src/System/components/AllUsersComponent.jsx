import React, { useContext, useEffect, useState } from "react";
import { Avatar, Card, List, Modal } from "antd";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import UsersBtns from "./UsersBtns";
import { deleteRequest } from "../Actions/Request";

const AllUsersComponent = ({ heading, url }) => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentItem, setCurrectItem] = useState({});

  const [modalOpen, setModalOpen] = useState(false);

  const gettingUsers = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth?.token) gettingUsers();
  }, [auth && auth?.token]);

  const removeUser = async (_id) => {
    let ok = window.confirm("Are you sure?");
    if (ok) {
      setLoading(true);
      const data = await deleteRequest(`/by/auth/delete-users/${_id}`, auth);
      if (data.ok) {
        setUsers(users.filter((x) => x._id !== _id));
        setLoading(false);
        toast.success("Has been removed!");
      }
    }
  };

  return (
    <>
      <Card title={heading}>
        <UsersBtns />
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a href="/"
                  key="list-loadmore-edit"
                  onClick={() => {
                    setModalOpen(true);
                    setCurrectItem(item);
                  }}
                >
                  edit
                </a>,
                <span
                  role="button"
                  className="text-danger"
                  key="list-loadmore-edit"
                  onClick={() => {
                    removeUser(item._id);
                  }}
                >
                  delete
                </span>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a href="/">{item.name}</a>}
                description={item.role}
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={currentItem.name}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={500}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default AllUsersComponent;
