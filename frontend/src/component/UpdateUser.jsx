import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const notifyC = () =>
    toast.success("User detail updated successfully", {
      position: "top-right",
      theme: "dark",
      containerId: "C",
    });
  const notifyCError = () =>
    toast.error("Error while updating user ", {
      position: "top-right",
      theme: "dark",
      containerId: "C",
    });
  useEffect(() => {
    axios
      .get(`https://mern-project-api-tau.vercel.app/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const submitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://mern-project-api-tau.vercel.app/api/update/${id}`, user);
      notifyC();
      navigate("/");
    } catch (error) {
      notifyCError();
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Button variant="outlined" href={"/"}>
        Back
      </Button>
      <form onSubmit={submitChange}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="firstName"
          value={user.firstName}
          label="First Name"
        />
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="lastName"
          value={user.lastName}
          label="Last Name"
        />
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="email"
          value={user.email}
          label="Email"
        />
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="password"
          value={user.password}
          label="Password"
        />
        <Button type="submit" variant="contained">
          Update User
        </Button>
      </form>
    </div>
  );
}
