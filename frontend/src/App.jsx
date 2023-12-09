import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomAlert from './Components/CustomAlert';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Details from "./Pages/Details";
import Products from "./Pages/Products";
import { styled } from "@mui/material/styles";

function App() {
  const { msg } = useSelector(
    (rootReducer) => rootReducer.alertReducer
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Products />,
      errorElement: <ErrorPage />,
    },
    {
      path: "details/:idProduct",
      element: <Details />,
    },
  ]);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Demo>
      {msg.status && <CustomAlert msg={msg} />}
      <div className="App__Main">
        <RouterProvider router={router} />
      </div>
    </Demo>
  );
}

export default App;
