import { Container, TextField } from "@mui/material";
import React, { useRef } from "react";
import FormButton from "../UI/FormButtom";

type Props = { onNext: (alias: string | undefined) => void };

export default function AliasForm(props: React.PropsWithChildren<Props>) {
  //hooks
  const aliasInputRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    props.onNext(aliasInputRef.current!.value);
  };
  return (
    <Container
      maxWidth="md"
      style={{ padding: "10px" }}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        inputRef={aliasInputRef}
        margin="dense"
        type="text"
        variant="outlined"
        size="small"
        label="Enter an Alias"
        InputLabelProps={{ sx: { color: "#f5dfff", "&.Mui-focused": { color: "white" } } }}
        inputProps={{ sx: { color: "white" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.39)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <div style={{ textAlign: "center", width: "100%", marginTop: "10px", marginBottom: "10px" }}>
        <FormButton onClickButton={onClickButton} variant="outlined">
          Next
        </FormButton>
      </div>
    </Container>
  );
}
