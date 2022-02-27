import React, { memo } from "react";
import { css } from "@emotion/css";

export interface IPromptSaveAbortProps {
  show: boolean;
  setshowModal(value: boolean): void;
  save(): void;
  abort?(): void;
}

function PromptSaveAbort({
  show,
  setshowModal,
  save,
  abort,
}: IPromptSaveAbortProps): JSX.Element {
  if (!show) {
    return <></>;
  }
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setshowModal(false);
      }}
      id="myModal"
      className={css`
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      `}
    >
      <div
        className={css`
          background-color: #fefefe;
          margin: 15% auto; /* 15% from the top and centered */
          padding: 20px;
          border: 1px solid #888;
          width: 80%; /* Could be more or less, depending on screen size */
        `}
      >
        <span
          onClick={() => setshowModal(false)}
          className={css`
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            &:hover {
              color: red;
              cursor: pointer;
            }
          `}
        >
          &times;
        </span>
        <p>Would you like to save or abort the current user creation?</p>
        <button onClick={save}>Save</button>
        <button onClick={abort}>Abort</button>
      </div>
    </div>
  );
}

export default memo(PromptSaveAbort);
