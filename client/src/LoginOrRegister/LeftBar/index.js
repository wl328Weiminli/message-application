import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconLogo from "./IconLogo";
import background from "./images/bg-img.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: `linear-gradient(#3A8DFF, transparent), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    opacity: "85%",
  },
  slogan: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
  },
}));
const LeftBar = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <div />
      <Grid container direction="column" alignItems="center">
        <IconLogo />
        <Typography className={classes.slogan}>Converse with anyone</Typography>
        <Typography className={classes.slogan}> with any language</Typography>
      </Grid>
      <div />
      <div />
    </Grid>
  );
};

export default LeftBar;
