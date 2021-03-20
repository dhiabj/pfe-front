/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./components/FontAwesomeIcons";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoggedOutRoute from "./components/Routes/LoggedOutRoute";
import LoggedInRoute from "./components/Routes/LoggedInRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./_redux/actions/auth";
import HomePage from "./pages/HomePage/HomePage";
import TransactionsPage from "./pages/TransactionsPages/TransactionsPage";
import OrdresPage from "./pages/OrdresPages/OrdresPage";
import StockPage from "./pages/StocksPages/Stock/StockPage";
import MouvementPage from "./pages/StocksPages/Mouvement/MouvementPage";
import ReferentielPage from "./pages/ReferentielPages/ReferentielPage";
import ChargementStock from "./pages/ChargementPages/ChargementStock";
import ChargementMouvement from "./pages/ChargementPages/ChargementMouvement";
import SideBar from "./containers/Navigation/Sidebar";
function App() {
  const loading = useSelector((state) => state.loading.loading);
  const { logged, isVerified } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = localStorage.token;
  useEffect(() => {
    dispatch(getUser());
  }, [token]);

  return (
    <div className="App">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="lds-ring spinner-pos">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>
          {isVerified && (
            <>
              <ToastContainer />
              <BrowserRouter>
                <SideBar logged={logged}>
                  <Switch>
                    <LoggedOutRoute exact path="/login" component={LoginPage} />
                    <LoggedInRoute exact path="/" component={HomePage} />
                    <LoggedInRoute
                      exact
                      path="/transactions"
                      component={TransactionsPage}
                    />
                    <LoggedInRoute
                      exact
                      path="/ordres"
                      component={OrdresPage}
                    />
                    <LoggedInRoute exact path="/stocks" component={StockPage} />
                    <LoggedInRoute
                      exact
                      path="/mouvements"
                      component={MouvementPage}
                    />
                    <LoggedInRoute
                      exact
                      path="/referentiel"
                      component={ReferentielPage}
                    />
                    <LoggedInRoute
                      exact
                      path="/chargement-stock"
                      component={ChargementStock}
                    />
                    <LoggedInRoute
                      exact
                      path="/chargement-mouvement"
                      component={ChargementMouvement}
                    />
                  </Switch>
                </SideBar>
              </BrowserRouter>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
