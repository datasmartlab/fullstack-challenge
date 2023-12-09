import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ContentButtons,
  Content_padding_2_vw,
  ContentProductListMain,
  MainDialog,
} from "../../styles";
import { Button, IconButton, Typography } from "@mui/material";
import CustomInput from "../CustomInput";
import { useDispatch } from "react-redux";
import { addMensage } from "../../redux/alert/actions";

function DetailsList({ data_Id, data_Name, data_Price, data_Description }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Id, SetId] = useState(data_Id);
  const [Name, SetName] = useState(data_Name);
  const [Price, SetPrice] = useState(data_Price);
  const [Description, SetDescription] = useState(data_Description);

  const [Disabled, SetDisabled] = useState(true);

  const handleEdit = useCallback(async () => {
    try {
      const route = "http://localhost:3001/products/" + Id;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Id,
          nome: Name,
          preco: Price,
          descricao: Description,
        }),
      };
      const resData = await fetch(route, options).then((res) => res);

      return dispatch(
        addMensage({
          status: resData.status,
          title: resData.status,
          type: resData.status,
          text: resData.statusText,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [Name, Price, Description, Id]);

  const handleDelete = useCallback(async () => {
    try {
      const route = "http://localhost:3001/products/" + Id;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Id,
          nome: Name,
          preco: Price,
          descricao: Description,
        }),
      };

      const resData = await fetch(route, options).then((res) => res);

      navigate("/");

      return await dispatch(
        addMensage({
          status: resData.status,
          title: resData.status,
          type: resData.status,
          text: resData.statusText,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [Name, Price, Description, Id, , navigate, dispatch]);

  const handleActive = useCallback(() => {
    SetDisabled(!Disabled);
  }, [Disabled]);

  return (
    <>
      <ContentProductListMain>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Detalhes do Produto
          <IconButton onClick={handleActive}>
            <EditIcon />
          </IconButton>
        </Typography>

        <MainDialog>
          <Content_padding_2_vw>
            <CustomInput
              disabled={Disabled}
              title="Nome"
              type="text"
              setValue={SetName}
              value={Name}
              id={"product_name"}
            />
          </Content_padding_2_vw>

          <Content_padding_2_vw>
            <CustomInput
              disabled={Disabled}
              title="Preço"
              type="number"
              setValue={SetPrice}
              value={Price}
              id={"product_price"}
            />
          </Content_padding_2_vw>

          <Content_padding_2_vw>
            <CustomInput
              disabled={Disabled}
              title="Descrição"
              type="text"
              setValue={SetDescription}
              value={Description}
              id={"product_description"}
            />
          </Content_padding_2_vw>
        </MainDialog>

        <ContentButtons>
          <Button
            variant="outlined"
            endIcon={<EditIcon />}
            onClick={() => handleEdit()}
            disabled={Disabled}
          >
            Editar
          </Button>

          <Button
            variant="outlined"
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete()}
            disabled={!Disabled}
          >
            Deletar
          </Button>
        </ContentButtons>
      </ContentProductListMain>
    </>
  );
}

export default DetailsList;
