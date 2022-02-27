import { css } from "@emotion/css";
import React, { memo } from "react";

export interface IContainerProps {}

const Container: React.FC<IContainerProps> = (props): JSX.Element => {
  return (
    <div
      className={css`
        display: flex;
        padding-block: 5vh;
        margin-inline: 10px;
        // flex-direction: column;
        justify-content: center;
        align-items: stretch;
      `}
    >
      {props.children}
    </div>
  );
};

export default memo(Container);
