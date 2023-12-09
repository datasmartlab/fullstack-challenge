import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  List,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DialogList from "../Dialog";
import {
  ContentItem,
  ContentListItem,
  ContentProductListMain,
} from "../../styles";
import { useSelector } from "react-redux";

function ProductsList() {
  const { currentProducts } = useSelector(
    (rootReducer) => rootReducer.productReducer
  );
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <>
      <ContentProductListMain>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Lista Produtos
          <IconButton onClick={() => setOpen((x) => !x)}>
            <AddCircleIcon />
          </IconButton>
        </Typography>

        <List dense={true}>
          {currentProducts.map((x) => (
            <ContentListItem key={x.id}>
              <ContentItem>
                <ListItem id={x.id} onClick={() => navigate("details/" + x.id)}>
                  <ListItemText primary={x.nome} secondary={x.descricao} />
                </ListItem>
              </ContentItem>
            </ContentListItem>
          ))}

          <DialogList
            open={open}
            setOpen={setOpen}
            title={"Cadastrar Produto"}
            ButtonTitleText={"Cadastrar"}
            method={"POST"}
            route={"http://localhost:3001/products"}
          />
        </List>
      </ContentProductListMain>
    </>
  );
}

export default ProductsList;
