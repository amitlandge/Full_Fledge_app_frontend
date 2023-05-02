import React from "react";

import Modal from "../UI/Components/Modal";
import "./ErrorModal.css";
const ErrorModal = (props) => {
  return (
    <Modal
      hideMap={props.onCancel}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<button onClick={props.onClear}>Okay</button>}
    >
      <h1 className="error">{props.error}</h1>
    </Modal>
  );
};

export default ErrorModal;
