import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Btn from "./Btn";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProfileComponent = ({ open, setOpen }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth && auth.token) {
      setEmail(auth?.user?.email);
      setName(auth?.user?.name);
    }
  }, [auth && auth.token]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password is not matched");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put(
        `/update-user`,
        {
          id: auth?.user?._id,
          name,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      // console.log("update_user", data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        // udpate context and local storage for current user only
        if (auth?.user?._id === data._id) {
          setAuth({ ...auth, user: data });
          let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
          fromLocalStorage.user = data;
          localStorage.setItem("auth", JSON.stringify(fromLocalStorage));
        }

        setLoading(false);
        toast.success("User updated successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("User update failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={name}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
      footer={null}
    >
      {/* {loading && "loading..."} */}
      <div className="form-group py-2">
        <label for="exampleFormControlInput1"> Your Image</label>
        <input
          onChange={() => {}}
          type="file"
          accept="images/*"
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Company"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Company"
              name="email"
              value={email}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Password </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Confirm Password </label>
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="text-end mt-3">
        <Btn loading={loading} className="btn-active" onClick={onSubmit}>
          Update Profile
        </Btn>
      </div>
    </Modal>
  );
};

export default UpdateProfileComponent;
