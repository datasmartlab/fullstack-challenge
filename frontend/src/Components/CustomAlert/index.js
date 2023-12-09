import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addMensage } from "../../redux/alert/actions";

function CustomAlert({ msg }) {
  const dispatch = useDispatch();
  return (
    <>
      {msg.status && (
        <Alert
          severity={
            (msg.status === 400 && "error") || (msg.status === 200 && "success")
          }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() =>
                dispatch(
                  addMensage({
                    status: false,
                    title: "",
                    type: "",
                    text: "",
                  })
                )
              }
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg.title + " | " + msg.text}
        </Alert>
      )}
    </>
  );
}

export default CustomAlert;
