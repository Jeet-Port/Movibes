import { Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();

  return (
    <Button 
      sx={{ "&:hover": { background: "transparent" }, textTransform: "none" }}
      component={Link}
      to="/"
    >
      <Typography fontWeight="700" fontSize="1.7rem" color={theme.palette.mode === 'dark' ? 'white' : 'black'}>
        Movi
      </Typography>
      <Typography fontSize="1.7rem" color={theme.palette.primary.main}>
        Bes
      </Typography>
    </Button>
  );
};

export default Logo;
