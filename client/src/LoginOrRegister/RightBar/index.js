import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loginOrRegister: {
    display: "flex",
    marginRight: "60px",
    alignItems: "center",
  },
  switchButton: {
    marginLeft: "20px",
  },
  shadeTextColor: { color: "rgba(0,0,0,0.38)" },
  spaceToInput: { marginBottom: "35px" },
}));
const RightBar = (props) => {
  console.log(props);
  const { children, notation, textInButton, titleText, jumpFunc } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid container item justify="flex-end">
        <div className={classes.loginOrRegister}>
          <Typography className={classes.shadeTextColor}>{notation}</Typography>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.switchButton}
            onClick={jumpFunc}
          >
            {textInButton}
          </Button>
        </div>
      </Grid>
      <div>
        <Typography variant="h4" className={classes.spaceToInput}>
          {titleText}
        </Typography>
        {children}
      </div>
      <div />
      <div />
    </Grid>
  );
};

export default RightBar;
