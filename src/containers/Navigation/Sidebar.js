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
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon icon="chart-line" className="mr-2" />
                          Historique Stock
                        </div>
                      }>
                      <Link to="/stocks">Historique STOCK par jour</Link>
                      <Link to="/sticodevam">Historique STOCK par periode</Link>
                    </Collapsible>
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon icon="chart-line" className="mr-2" />
                          Historique Mouvement
                        </div>
                      }>
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
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon icon="user-cog" className="mr-2" />
                          Référentiel général
                        </div>
                      }>
                      <Link to="/données-générales">Données Générales</Link>
                    </Collapsible>
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon icon="user-cog" className="mr-2" />
                          Référentiel STICODEVAM
                        </div>
                      }>
                      <Link to="/natures-comptes">Nature de comptes</Link>
                      <Link to="/codes-operations">Codes opérations</Link>
                      <Link to="/categories-avoir">Catégories d'avoir</Link>
                      <Link to="/adherents">Adhérents</Link>
                      <Link to="/types-adherents">Types des adhérents</Link>
                    </Collapsible>
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon icon="user-cog" className="mr-2" />
                          Référentiel INTERMEDIAIRES
                        </div>
                      }>
                      <Link to="/codes-comptes">Codes de comptes</Link>
                      <Link to="/codes-marché">Codes Marché</Link>
                      <Link to="/codes-titre">Codes Titre</Link>
                      <Link to="/codes-profit">Codes Profit</Link>
                      <Link to="/codes-reglement">Codes Réglement</Link>
                    </Collapsible>
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
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon
                            icon="file-upload"
                            className="mr-2"
                          />
                          Chargement STICODEVAM
                        </div>
                      }>
                      <Link to="/chargement-stock">Chargemenent STOCK</Link>
                      <Link to="/renseignements-stock">
                        Renseignements STOCK
                      </Link>
                      <Link to="/chargement-mouvement">
                        Chargemenent MOUVEMENT
                      </Link>
                      <Link to="/renseignements-mouvement">
                        Renseignements Mouvements
                      </Link>
                    </Collapsible>
                    <Collapsible
                      open={false}
                      header={
                        <div>
                          <FontAwesomeIcon
                            icon="file-upload"
                            className="mr-2"
                          />
                          Chargement INTERMEDIAIRES
                        </div>
                      }>
                      <Link to="/chargement-intermediaire">
                        Chargemenent INTERMEDIAIRES
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

      <div className={logged ? "col content container pr-3 pl-1" : ""}>
        {children}
      </div>
    </div>
  );
};
export default SideBar;
