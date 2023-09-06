import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export function ButtonUpdate() {

  return (
    <>
      <Stack direction="row" spacing={2} sx={{width: "100%"}}>
        <Button type="submit" color="primary" variant="contained" sx={{width: "100%"}}>
          Salvar
        </Button>
      </Stack>
    </>
  );
}
