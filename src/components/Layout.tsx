import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { memo, PropsWithChildren } from "react";
import Container from "./Container";

export const ErrorBlock = styled.div`
  color: red;
`;
export interface ILayoutProps {
  title: string;
  buttonText?: string;
  buttonAction?(): void;
  close?(): void;
}

const Layout = ({
  title,
  buttonText,
  buttonAction,
  children,
  close,
}: PropsWithChildren<ILayoutProps>): JSX.Element => {
  return (
    <Container>
      <div
        className={css`
          flex-direction: column;
          flex: 1;
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;
          align-items: flex-start;
        `}
      >
        <h3
          className={css`
            width: 242px;
          `}
        >
          {title}
          {close && (
            <div
              onClick={() => close()}
              className={css`
                color: #aaa;
                float: right;
                margin-right: 10px;
                // font-size: 28px;
                font-weight: bold;
                &:hover {
                  color: red;
                  cursor: pointer;
                }
              `}
            >
              &times;
            </div>
          )}
        </h3>
        {children}
      </div>
      <div
        className={css`
          padding-top: 20px;
          flex-grow: 0.1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          align-content: center;
        `}
      >
        {buttonText && buttonAction && (
          <button onClick={buttonAction}>{buttonText}</button>
        )}
      </div>
    </Container>
  );
};

export default memo(Layout);
