import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { FormMaterial } from "./pages/form";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Formulario" element={<FormMaterial />} />
            <Route path="/Formulario/:id" element={<FormMaterial/>}/>
          </Routes>
        </ThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
