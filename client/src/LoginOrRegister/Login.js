import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Button, FormControl, TextField } from "@material-ui/core";
import { login } from "../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  widthForInput: theme.widthForInput,
  logInOrRegisterButton: theme.logInOrRegisterButton,
}));

const Login = (props) => {
  const { user, login } = props;
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center">
      <Box>
        <form onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  className={classes.widthForInput}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
                className={classes.widthForInput}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <Grid container justify="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={classes.logInOrRegisterButton}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
