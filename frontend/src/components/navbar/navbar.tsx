import { Box, AppBar, Toolbar, Typography, Link } from "@mui/material";


export function Navbar() {
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          boxShadow: "0.5px 2px 2px black",
          width: "100vw",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "primary" }}>
          <Toolbar>
            <Typography
              variant="h3"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              <Link color="secondary" underline="hover" href="/">Desafio FullStack</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
