import React, { memo } from "react";
import ReactDOM from "react-dom";

export interface IModalProps {}

const Modal: React.FC<IModalProps> = ({ children }): JSX.Element => {
  const modalRoot = document.getElementById("modal-root");

  if (modalRoot === null) {
    return <></>;
  }

  return ReactDOM.createPortal(children, modalRoot);
};

export default memo(Modal);
