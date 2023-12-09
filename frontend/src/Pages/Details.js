import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Details from "../Components/Details";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DetailsPage() {
  const navigate = useNavigate();
  const { idProduct } = useParams();
  const [data, setData] = useState();
  const [Load, setLoad] = useState(true);

  useEffect(
    () => async () => {
      try {
        const path = "http://localhost:3001";
        const _route = "/products/";

        const data = await fetch(path + _route + idProduct);
        const resData = await data.json();
        setLoad(false);
        return setData(resData);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  if (Load) return <h1>carregando</h1>;
  console.log(data);
  return (
    <>
      <IconButton aria-label="delete" onClick={() => navigate("/")}>
        <ArrowBackIcon sx={{ color: "#000" }} fontSize="large" />
      </IconButton>
      <Details
        data_Id={data.id}
        data_Name={data.nome}
        data_Price={data.preco}
        data_Description={data.descricao}
      />
    </>
  );
}

export default DetailsPage;
