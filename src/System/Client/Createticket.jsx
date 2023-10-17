import React, { useContext, useEffect, useState } from "react";
import ClientLayout from "./components/ClientLayout";
import { Button, Card, Input, Select } from "antd";
import Breadcrumbs from "../components/Breadcrumbs";
import { IoCreate, IoHome, IoSendOutline } from "react-icons/io5";
import { AuthContext } from "../../context/Auth";
import { GetRequest, PostRequest } from "../Actions/Request";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initValues = {
  title: "",
  description: "",
  category: "",
  priority: "",
};
const Createticket = () => {
  const [auth] = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priorty: "",
    category: "",
  });
  const router = useNavigate();
  const getData = async () => {
    const data = await GetRequest("all/categories", auth);
    setCategories(data.categories);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    getData();
  }, [auth && auth?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.title ||
      !formData.description ||
      !formData.priority
    ) {
      toast.error("All fields are requried");
      return;
    }
    const data = await PostRequest("/add/ticket", formData, auth);

    if (data.ok) {
      setFormData(initValues);
      toast.success("Create created :)");
      router("/client/open-ticket");
    } else if (data.error) {
      toast.error(data.error);
    }
  };
  return (
    <ClientLayout>
      <Breadcrumbs
        from={"Client"}
        fromPath={"/client"}
        to={"create ticket"}
        fromIcon={<IoHome className="bread-text" />}
        toIcon={<IoCreate className="bread-text-active" />}
      />
      <Card>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1"> Title</label>
              <Input
                required
                type="text"
                style={{ border: "none" }}
                placeholder="Enter the title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label for="exampleFormControlInput1"> Description</label>
            <Input
              type="text"
              style={{ border: "none" }}
              placeholder="Enter the description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group py-2">
                <label>
                  Priorty<span className="text-danger">*</span>
                </label>
                <select
                  required
                  value={formData.priority}
                  name="priority"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  className="form-select"
                >
                  <option value="">Choose</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group py-2">
                <label>
                  Category<span className="text-danger">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  name="category"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  className="form-select"
                >
                  <option value="">Choose</option>
                  {categories.map((x, index) => (
                    <option key={index} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group py-2">
                <Button
                  className="clicks mt-3"
                  onClick={handleSubmit}
                  icon={<IoSendOutline />}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ClientLayout>
  );
};

export default Createticket;
