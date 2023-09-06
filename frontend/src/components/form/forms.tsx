import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { ButtonUpdate } from "../button/buttonUpdate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../../redux/product/sliceProduct";
import { RootState } from "../../redux/store";
import { Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export function Forms() {
  const dispatch = useDispatch();
  const { id: idParam } = useParams();
  const {
    getShowProductRequest,
    getUpdateProductRequest,
    getCreateProductRequest,
  } = actions;
  const { productInfo } = useSelector((state: RootState) => state.products);

  const { handleSubmit, control, reset } = useForm(); 

  const onSubmit = (data: ProductDataDTO) => {
    data.id
      ? dispatch(getUpdateProductRequest(data))
      : dispatch(getCreateProductRequest(data));
  };

  useEffect(() => {
    if (idParam) {
      dispatch(getShowProductRequest(idParam));
    }
  }, [dispatch, getShowProductRequest, idParam]);
''
  useEffect(() => {
    if (productInfo.id) {
      reset(productInfo);
    }
  }, [reset, productInfo]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!productInfo ? (
          ""
        ) : (
          <Grid //container envolta 
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ gap: 3 }}
          >
            {productInfo.id !== 0 ? (
              <Grid item xs={12}>
                <Controller
                  name="id"
                  defaultValue={0}//por no response do post
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth required disabled label="ID" />
                  )}
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Nome do Produto" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue={productInfo.description || ""}
                render={({ field }) => (
                  <TextField {...field} fullWidth required label="Descrição" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="price"
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth required label="Preço" type="number" />
                )}
              />
            </Grid>

            <ButtonUpdate/>
          </Grid>
        )}
      </form>
    </>
  );
}
