import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const LoggedInRoute = ({ component, path, exact }) => {
  const logged = useSelector((state) => state.auth.logged);

  if (!logged) return <Redirect to="/login" />;
  return <Route path={path} exact={exact} component={component} />;
};
export default LoggedInRoute;
