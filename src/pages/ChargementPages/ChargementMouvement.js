import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  mouvementUpload,
  resetProgress,
} from "../../_redux/actions/fileUpload";
import Message from "../../containers/Message";
import ProgressBar from "../../containers/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

const ChargementMouvement = () => {
  const { handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState("");
  const [filePicked, setFilePicked] = useState(false);
  const [filename, setFilename] = useState("Choisir le fichier");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setFilePicked(true);
    dispatch(resetProgress());
    console.log(selectedFile);
  };

  useEffect(() => {
    return () => {
      dispatch(resetProgress());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileUpload = () => {
    if (filePicked) {
      const formData = new FormData();
      formData.append("mouvements", selectedFile, selectedFile.name);
      //console.log(selectedFile);
      dispatch(mouvementUpload(formData));
    } else {
      setMessage("Selectionner un fichier");
    }
  };

  return (
    <div className="card">
      <h5 className="card-header">
        <FontAwesomeIcon icon="file-upload" className="mr-2" />
        Chargement des données MOUVEMENT
      </h5>
      <div className="card-body">
        <img src={logo} alt="cmf-logo" className="img-fluid img-center" />
        {message ? <Message msg={message} /> : null}
        <form onSubmit={handleSubmit(onFileUpload)}>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onFileChange}
            />
            <label
              className="custom-file-label"
              htmlFor="customFile"
              data-browse="Parcourir">
              {filename}
            </label>
          </div>
          <ProgressBar />
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChargementMouvement;
