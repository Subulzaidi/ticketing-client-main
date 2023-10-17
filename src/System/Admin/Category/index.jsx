import toast from "react-hot-toast";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Divider, Form, Input, List } from "antd";

import AdminLayout from "../components/AdminLayout";
import { AuthContext } from "../../../context/Auth";

import { GetRequest, PostRequest, deleteRequest } from "../../Actions/Request";

const Category = () => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    const data = await PostRequest(
      "/by/auth/create/category",
      values,
      auth && auth
    );
    if (data.error) {
      toast.error(data.error);
      setLoading(false);
    } else {
      toast.success(data.message);
      setCategories([...categories, data.category]);
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    toast.error("Submit failed!");
  };

  const getData = async () => {
    setLoading(true);
    const data = await GetRequest("all/categories", auth);
    if (data) {
      setLoading(false);
      setCategories(data.categories);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      getData();
    }
  }, [auth && auth?.token]);

  const removeCats = async (_id) => {
    let ok = window.confirm("Are you sure?");
    if (ok) {
      setLoading(true);
      const data = await deleteRequest(`/by/auth/delete/${_id}`, auth);
      if (data.ok) {
        setCategories(categories.filter((x) => x._id !== _id));
        setLoading(false);
        toast.success(data.message);
      }
    }
  };

  return (
    <AdminLayout>
      <Card>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="small"
            className="btn-active "
            loading={loading}
          >
            Submit
          </Button>
        </Form>
        {/* list of categories */}
        <Divider />

        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <span
                  role="button"
                  className="text-danger"
                  key="list-loadmore-edit"
                  onClick={() => {
                    removeCats(item._id);
                  }}
                >
                  delete
                </span>,
              ]}
            >
              <List.Item.Meta title={<a>{item.name}</a>} />
            </List.Item>
          )}
        />
      </Card>
    </AdminLayout>
  );
};

export default Category;
