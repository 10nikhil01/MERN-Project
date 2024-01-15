import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

export default function User() {
  const notifyA = () =>
    toast.success("Users detail fetched successfully", {
      position: "top-right",
      theme: "dark",
      containerId: "A",
      delay: 1500,
    });
  const notifyD = (userId) =>
    toast.success(`User deleted successfully ${userId}`, {
      position: "top-right",
      theme: "dark",
      containerId: "D",
    });
  const notifyDError = () =>
    toast.error(`Error while deleting user !!`, {
      position: "top-right",
      theme: "dark",
      containerId: "D",
    });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };
    fetchData();
    if (users.length === 0) {
      notifyA();
    }
  }, [users]);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        console.log(response);
        notifyD(userId);
      })
      .catch((error) => {
        notifyDError();
        console.log(error);
      });
  };

  return (
    <div>
      <Button href={"/add"}>Add User</Button>
      <Table border={1}>
        <TableHead>
          <TableRow>
            <TableCell>s. No.</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{}}
                    color="warning"
                    href={`/edit/` + user._id}
                  >
                    <EditIcon sx={{ margin: 0 }} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
