import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  let checkLoginOrRegister;
  if (!props.location) {
    checkLoginOrRegister = "login";
  } else {
    const { pathname } = props.location;
    checkLoginOrRegister = pathname.split("/")[1];
  }
  const logInProps = {
    notation: "Don’t have an account?",
    textInButton: "Create Account",
    titleText: "Welcome Back!",
    jumpFunc: () => history.push("/register"),
  };
  const registerProps = {
    notation: "Already have an account?",
    textInButton: "Login",
    titleText: "Create an account!",
    jumpFunc: () => history.push("/login"),
  };
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={5}>
          <LeftBar />
        </Grid>
        <Grid container item xs={12} sm={7}>
          {checkLoginOrRegister === "login" ? (
            <RightBar {...logInProps} children={<Login />} />
          ) : (
            <RightBar {...registerProps} children={<Signup />} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LoginOrRegister;
