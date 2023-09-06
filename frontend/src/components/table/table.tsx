import MaterialTable from "@material-table/core";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { actions } from "../../redux/product/sliceProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export function TableMaterial() {
  const dispatch = useDispatch();
  const { getProductRequest, getDeleteProductRequest } = actions;
  const navigate = useNavigate();
  const item = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProductRequest());
  }, [dispatch, getProductRequest]);

  const column = [
    { title: "Nome", field: "name" },
    { title: "ID", field: "id" },
    { title: "Descrição", field: "description" },
    { title: "Preço", field: "price" },
  ]; //cabeça //maneiras mais complexa separar em arquivo

  //corpo
  const row: ProductDataDTO[] = item.list.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    }
  });

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <MaterialTable
        title=""
        style={{ boxShadow: "none" }}
        localization={{
          header: {
            actions: "",
          },
          toolbar: {
            searchTooltip: "Pesquisar",
            searchPlaceholder: "Pesquisar",
          },
          pagination: {
            labelRowsPerPage: "",
            labelRows: "linhas",
            labelDisplayedRows: "{count} de {from}-{to}",
            firstTooltip: "Primeira página",
            previousTooltip: "Página anterior",
            nextTooltip: "Próxima página",
            lastTooltip: "Última página",
          },
        }}
        options={{
          actionsColumnIndex: -1,
          searchFieldAlignment: "right",
        }}
        columns={column}
        data={row}
        actions={[
          {
            icon: AddIcon,
            tooltip: "Adicionar",
            isFreeAction: true,
            onClick: () => navigate("/Formulario"),
          },
          {
            icon: CreateIcon,
            tooltip: "Editar",
            onClick: (_event, row) => navigate(`/Formulario/${row.id}`), // '_' estou declarando mas nao vou usar
          },
          {
            icon: DeleteIcon,
            tooltip: "Deletar",
            onClick: (_event, row) => dispatch(getDeleteProductRequest(row.id)),
          },
        ]}
      />
    </Box>
  );
}
