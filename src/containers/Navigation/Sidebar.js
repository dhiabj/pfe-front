import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "../../css/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logout } from "../../_redux/actions/auth";
import Collapsible from "../../components/Collapsible/Collapsible";

const SideBar = ({ children, logged }) => {
  const [open, setOpen] = useState(true);
  const toggleSideBar = () => {
    setOpen(!open);
  };
  //console.log(open);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
  };
  return (
    <div className={logged ? "row no-gutters" : ""}>
      {logged && (
        <div>
          <Header toggleSideBar={toggleSideBar} />
          <div className="col-3 pl-0">
            <nav id="sidebar" className={!open ? "active" : null}>
              <div className="sidebar-header">
                <span>
                  <FontAwesomeIcon icon="user" className="mr-2" />
                  Admin
                </span>
              </div>

              <ul className="list-unstyled components ml-2">
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon="home" className="mr-2" />
                    Accueil
                  </Link>
                </li>
                <li>
                  <Collapsible
                    open={false}
                    header={
                      <div>
                        <FontAwesomeIcon icon="exchange-alt" className="mr-2" />
                        Transactions
                      </div>
                    }>
                    <Link to="/transactions">Transactions</Link>
                  </Collapsible>
                </li>

                <li>
                  <Collapsible
                    open={false}
                    header={
                      <div>
                        <FontAwesomeIcon icon="dollar-sign" className="mr-2" />
                        Orders
                      </div>
                    }>
                    <Link to="/ordres">Ordres</Link>
                  </Collapsible>
                </li>
                <li>
                  <Collapsible
                    open={false}
                    header={
                      <div>
                        <FontAwesomeIcon icon="chart-line" className="mr-2" />
                        STICODEVAM
                      </div>
                    }>
                    <Collapsible open={false} header="Historique Stock">
                      <Link to="/stocks">Historique STOCK par jour</Link>
                      <Link to="/sticodevam">Historique STOCK par periode</Link>
                    </Collapsible>
                    <Collapsible open={false} header="Historique Mouvement">
                      <Link to="/mouvements">Historique Mouvement</Link>
                    </Collapsible>
                  </Collapsible>
                </li>
                <li>
                  <Collapsible
                    open={false}
                    header={
                      <div>
                        <FontAwesomeIcon icon="user-cog" className="mr-2" />
                        Administration-Référentiel
                      </div>
                    }>
                    <Link to="/referentiel">Administration-Référentiel</Link>
                  </Collapsible>
                </li>
                <li>
                  <Collapsible
                    open={false}
                    header={
                      <div>
                        <FontAwesomeIcon icon="file-upload" className="mr-2" />
                        Administration-Chargement
                      </div>
                    }>
                    <Collapsible open={false} header="Chargement STICODEVAM">
                      <Link to="/chargement-stock">Chargemenent STOCK</Link>
                      <Link to="/chargement-mouvement">
                        Chargemenent MOUVEMENT
                      </Link>
                    </Collapsible>
                  </Collapsible>
                </li>
              </ul>
              <ul className="p-0 ml-2">
                <li>
                  <Link to="/login" onClick={signOut}>
                    <FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
                    Déconnecter
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className={logged ? "col-9 content" : ""}>{children}</div>
    </div>
  );
};
export default SideBar;
