import axios from "axios";

export default axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "http://192.168.1.110:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});
