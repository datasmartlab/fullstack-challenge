import { Container, Box } from "@mui/material";
import { Header } from "../../components/Header";
import { GlobalStyles } from "@mui/styled-engine-sc";
import { grey } from '@mui/material/colors'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
export function DefaultLayout() {
    return(
        <Box>
            <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
                    
        <GlobalStyles styles={{'*': {boxSizing: 'border-box', margin: 0, padding: 0, textDecoration: 'none', outline: 0, fontFamily: "'Marvel', sans-serif", }, body: {  } }} />
        <Header/>
        <Container maxWidth={"lg"} sx={{backgroundColor:grey[200],minHeight:'100vh'}}>
            <Outlet/>
        </Container>
    </Box>
    )
}