import IconButtonStyled from "./IconButton.styles";

type IconButtonProps = {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = (props: IconButtonProps) => {
  return <IconButtonStyled {...props}>{props.children}</IconButtonStyled>;
};

export default IconButton;
