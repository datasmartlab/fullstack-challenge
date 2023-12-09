import React, { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CustomInput from "../CustomInput";
import { MainDialog, Content_padding_2_vw, ContentDialog } from "../../styles";
import { useDispatch } from "react-redux";
import { addMensage } from "../../redux/alert/actions";

function DialogList({ open, setOpen, title, ButtonTitleText, method, route }) {
  const dispatch = useDispatch();
  const [Name, SetName] = useState("");
  const [Price, SetPrice] = useState("");
  const [Description, SetDescription] = useState("");

  const SaveData = useCallback(async () => {
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: Name,
          preco: Price,
          descricao: Description,
        }),
      };
      const resData = await fetch(route, options);
      return (
        setOpen(!open),
        dispatch(
          addMensage({
            status: resData.status,
            title: resData.status,
            type: resData.status,
            text: resData.statusText,
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [Name, Price, Description, method]);

  return (
    <MainDialog>
      <Dialog onClose={() => setOpen((x) => !x)} open={open}>
        <ContentDialog>
          <DialogTitle>{title}</DialogTitle>

          <IconButton
            onClick={() => setOpen((x) => !x)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Content_padding_2_vw>
            <CustomInput
              title="Nome"
              type="text"
              setValue={SetName}
              value={Name}
              id={"product_name"}
            />
          </Content_padding_2_vw>

          <Content_padding_2_vw>
            <CustomInput
              title="Preço"
              type="number"
              setValue={SetPrice}
              value={Price}
              id={"product_price"}
            />
          </Content_padding_2_vw>

          <Content_padding_2_vw>
            <CustomInput
              title="Descrição"
              type="text"
              setValue={SetDescription}
              value={Description}
              id={"product_description"}
            />
          </Content_padding_2_vw>

          <DialogActions>
            <Button color="inherit" onClick={() => setOpen((x) => !x)}>
              Cancelar
            </Button>

            <Button color="inherit" onClick={SaveData}>
              {ButtonTitleText}
            </Button>
          </DialogActions>
        </ContentDialog>
      </Dialog>
    </MainDialog>
  );
}

export default DialogList;
