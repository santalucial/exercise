import { css } from "@emotion/css";
import React, { memo, useState } from "react";
import FriendList from "./FriendList";
import Modal from "./Modal";
import { useSharedStore } from "./Store";

const row = css`
  flex-direction: row;
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export interface IFriendsBoxProps {
  friends: number[];
  setFriends(value: number[]): void;
  setfriendCreation(value: boolean): void;
  userId?: number;
}

function FriendsBox({
  userId,
  friends,
  setFriends,
  setfriendCreation,
}: IFriendsBoxProps): JSX.Element {
  const [showModal, setshowModal] = useState(false);
  const [store] = useSharedStore();

  return (
    <div
      className={css`
        margin-top: 20px;
      `}
    >
      <div>Friends</div>
      <div
        className={css`
          padding: 20px;
          border: solid 1px black;
          margin-top: 10px;
          width: 200px;
        `}
      >
        <div className={row}>
          <div>
            <button onClick={() => setshowModal(true)}>Select friend</button>
          </div>
          <div>
            <button onClick={() => setfriendCreation(true)}>New Friend</button>
          </div>
        </div>
        {store.users
          .filter((u) => friends.includes(u.id))
          .filter((u) => u.id !== userId)
          .map((u, key) => (
            <div key={key} className={row}>
              <div>
                <span>{u.name}</span>
              </div>
              <div>
                <button
                  onClick={() => setFriends(friends.filter((f) => f !== u.id))}
                >
                  Remove Friend
                </button>
              </div>
            </div>
          ))}

        <Modal>
          <FriendList
            friends={friends}
            setFriends={setFriends}
            show={showModal}
            setshowModal={setshowModal}
          />
        </Modal>
      </div>
    </div>
  );
}

export default memo(FriendsBox);
