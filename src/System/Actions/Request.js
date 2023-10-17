import axios from "axios";
import toast from "react-hot-toast";

export const PostRequest = async (url, data, auth) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error("Failed,try again");
    console.log(error);
  }
};

export const GetRequest = async (url, auth) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error("Failed,try again");
    console.log(error);
  }
};
export const deleteRequest = async (url, auth) => {
  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
  } catch (error) {
    toast.error("Failed,try again");
    console.log(error);
  }
};
export const PutRequest = async (url, data, auth) => {
  try {
    const res = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error("Failed, try again");
    console.log(error);
  }
};
