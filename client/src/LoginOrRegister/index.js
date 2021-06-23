import Login from "./Login";
import Signup from "./Signup";
const LoginOrRegister = (props) => {
  let checkLoginOrRegister;
  if (!props.location) {
    checkLoginOrRegister = "login";
  } else {
    const { pathname } = props.location;
    checkLoginOrRegister = pathname.split("/")[1];
  }
  console.log("@@", checkLoginOrRegister);
  return <>{checkLoginOrRegister === "login" ? <Login /> : <Signup />}</>;
};

export default LoginOrRegister;
