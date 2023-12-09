import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import { Box, Grid } from "@mui/material";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6}>
          <App />
        </Grid>
      </Box>
    </Provider>
  </React.StrictMode>
);
