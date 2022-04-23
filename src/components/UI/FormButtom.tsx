import { Button, SxProps, Theme } from "@mui/material";

interface Props extends ReactProps {
  onClickButton: () => void;
  sx?: SxProps<Theme>;
  variant?: "text" | "outlined" | "contained";
  size?: "large" | "medium" | "small";
}
type Classes = {
  button: SxProps<Theme>;
};

export default function FormButton(props: Props) {
  const classes: Classes = {
    button: {
      color: "white",
      borderColor: "#ffffffa6",
      "&:hover": {
        bgcolor: "#ffffffc0e",
        borderColor: "white",
      },
      ...props.sx,
    },
  };
  return (
    <Button
      size={props.size || "medium"}
      onClick={props.onClickButton}
      variant={props.variant || "outlined"}
      sx={classes.button}
    >
      {props.children}
    </Button>
  );
}
