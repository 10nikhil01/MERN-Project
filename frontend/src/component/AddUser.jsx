import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const notifyB = () =>
    toast.success("User added successfully !!", {
      position: "top-right",
      theme: "dark",
      containerId: "B",
    });
  const notifyBError = () => {
    toast.error("error adding user !!", {
      position: "top-right",
      theme: "dark",
      containerId: "B",
    });
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/create", user)
      .then(() => {
        notifyB();
        navigate("/");
      })
      .catch((error) => {
        notifyBError();
        console.log(error);
      });
  };
  return (
    <div>
      <Button variant="text" href={"/"}>
        Back
      </Button>
      <Typography>Add a User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          onChange={handleInput}
          name="firstName"
          label="First Name"
        />
        <TextField
          variant="outlined"
          onChange={handleInput}
          name="lastName"
          label="Last Name"
        />
        <TextField
          variant="outlined"
          onChange={handleInput}
          name="email"
          label="Email"
        />
        <TextField
          variant="outlined"
          onChange={handleInput}
          name="password"
          label="Password"
        />
        <Button type="submit" variant="contained">
          Add User
        </Button>
      </form>
    </div>
  );
}

export default AddUser;
