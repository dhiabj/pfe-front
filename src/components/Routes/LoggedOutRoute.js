import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const LoggedOutRoute = ({ component, path, exact }) => {
  const logged = useSelector((state) => state.auth.logged);

  return logged ? (
    <Redirect to="/" />
  ) : (
    <Route path={path} exact={exact} component={component} />
  );
};
export default LoggedOutRoute;
