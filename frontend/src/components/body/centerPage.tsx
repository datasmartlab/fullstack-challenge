import { Container } from "@mui/material";
import { ReactNode } from "react";

interface CenterPageProps {
  children: ReactNode;
}

export function CenterPage(props: CenterPageProps) {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          width: "100%",
          padding: "24px",
        }}
      >
        {props.children}
      </Container>
    </>
  );
}
