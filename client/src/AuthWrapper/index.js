import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SideBar from "./SideBar";
import FormWrapper from "./FormWrapper";
import Login from "./Login";
import Signup from "./Signup";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

const AuthWrapper = (props) => {
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
        <Hidden xsDown>
          <Grid item sm={5}>
            <SideBar />
          </Grid>
        </Hidden>

        <Grid container item xs={12} sm={7}>
          {checkLoginOrRegister === "login" ? (
            <FormWrapper {...logInProps} children={<Login />} />
          ) : (
            <FormWrapper {...registerProps} children={<Signup />} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AuthWrapper;
