import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import Login from "./Login";
import Signup from "./Signup";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

const LoginOrRegister = (props) => {
  const classes = useStyles();
  let checkLoginOrRegister;
  if (!props.location) {
    checkLoginOrRegister = "login";
  } else {
    const { pathname } = props.location;
    checkLoginOrRegister = pathname.split("/")[1];
  }
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={5}>
          <LeftBar />
        </Grid>
        <Grid container item xs={12} sm={7}>
          {checkLoginOrRegister === "login" ? (
            <RightBar children={<Login />} />
          ) : (
            <RightBar children={<Signup />} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LoginOrRegister;
