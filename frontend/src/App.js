import * as React from "react";
import { Typography } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./component/User";
import AddUser from "./component/AddUser";
import UpdateUser from "./component/UpdateUser";
const route = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/add",
    element: <AddUser />,
  },
  {
    path: "/edit/:id",
    element: <UpdateUser />,
  },
]);
export default function App() {
  return (
    <div>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "600", fontFamily: "calibri" }}
      >
        MERN App
      </Typography>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}
