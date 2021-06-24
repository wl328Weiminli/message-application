import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconLogo from "./IconLogo";
import background from "./images/bg-img.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    background: `linear-gradient(#3A8DFF, transparent), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    opacity: "85%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  slogan: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
  },
}));
const LeftBar = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div />
      <Box className={classes.wrapper}>
        <IconLogo />
        <Typography className={classes.slogan}>Converse with anyone</Typography>
        <Typography className={classes.slogan}> with any language</Typography>
      </Box>
      <div />
      <div />
    </Box>
  );
};

export default LeftBar;
