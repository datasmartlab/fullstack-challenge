import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#CD6C6C",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontSize: 18,    
    h3: {
      fontWeight: 700,
      fontSize: "3rem",
      fontFamily: "Lobster, cursive",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 400, // Extra small
      sm: 600, // Small devices
      md: 960, // Medium devices
      lg: 1280, // Large devices
      xl: 1920, // Extra large devices
    },
  },



});
