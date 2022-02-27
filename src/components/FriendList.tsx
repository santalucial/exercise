import React, { memo } from "react";
import { css, cx } from "@emotion/css";
import { useSharedStore } from "./Store";
import { Link } from "react-router-dom";

export interface IFriendListProps {
  show: boolean;
  setshowModal(value: boolean): void;
  friends: number[];
  setFriends(value: number[]): void;
}

function FriendList({
  show,
  setshowModal,
  friends,
  setFriends,
}: IFriendListProps): JSX.Element {
  const [store, dispatch] = useSharedStore();

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
          min-height: 50px;
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
          {store.users
            .filter((u) => !friends.includes(u.id))
            .map((user, key) => (
              <button
                className={css`
                  margin-block: 5px;
                `}
                key={key}
                onClick={() => {
                  setFriends([...friends, user.id]);
                  setshowModal(false);
                }}
              >
                {user.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default memo(FriendList);
