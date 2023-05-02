import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const ModalOverlay = (props) => {
  return (
    <div className="overlay">
      <h2>{props.address}</h2>
      {props.children}
      <footer className="footer">
        <button onClick={props.onCancelMap}>Cancel</button>
      </footer>
    </div>
  );
};
const Backdrop = () => {
  return <div className="backdrop"></div>;
};
const element = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, element)}
      {ReactDOM.createPortal(
        <ModalOverlay address={props.address} onCancelMap={props.hideMap}>{props.children}</ModalOverlay>,
        element
      )}
    </div>
  );
};

export default Modal;
