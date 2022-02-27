import { css } from "@emotion/css";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendsBox from "../components/FriendsBox";
import Layout, { ErrorBlock } from "../components/Layout";
import Modal from "../components/Modal";
import NameEdit from "../components/NameEdit";
import PromptSaveAbort from "../components/PromptSaveAbort";
import { useSharedStore } from "../components/Store";

export interface ICreateEditProps {
  stackPosition?: number;
  close?(num?: number): void;
  userId?: number;
}

function CreateEdit({
  close,
  stackPosition = 0,
  userId,
}: ICreateEditProps): JSX.Element {
  const [store, dispatch] = useSharedStore();
  const latestId = useRef(store.id);
  const navigate = useNavigate();

  const isCreation = userId === undefined;

  const [name, setname] = useState(
    isCreation ? "" : store.users.find((user) => user.id === userId!)?.name!
  );
  const [friendCreation, setfriendCreation] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const [friends, setFriends] = useState<number[]>(
    isCreation
      ? []
      : [
          ...store.friendShips
            .filter((f) => f.from === userId!)
            .map((f) => f.to),
          ...store.friendShips
            .filter((f) => f.to === userId!)
            .map((f) => f.from),
          userId!,
        ]
  );

  const doUpdate = useCallback(() => {
    if (isCreation) {
      dispatch({ type: "CreateUser", payload: { name, friends } });
    } else {
      dispatch({ type: "UpdateUser", payload: { id: userId!, name, friends } });
    }
  }, [dispatch, friends, isCreation, name, userId]);

  useEffect(() => {
    return () => {
      dispatch({ type: "ClearError" });
    };
  }, []);

  const attemptNo = "attemptNo" in store ? store.attemptNo : 0;
  useEffect(() => {
    if (attemptNo === 1 && !friendCreation) {
      setTimeout(doUpdate, 2000);
    }
  }, [attemptNo, doUpdate, friendCreation]);

  useEffect(() => {
    if (!friendCreation && latestId.current !== store.id) {
      if (close !== undefined) {
        close(latestId.current);
      } else {
        navigate("/");
      }
    }
    latestId.current = store.id;
  }, [close, friendCreation, navigate, store.id]);

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setShowPrompt(true);
      }}
      className={css`
        position: absolute; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: ${0}px;
        top: 0;
        width: 100vw; /* Full width */
        height: 100vh; /* Full height */
        // overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: ${(!friendCreation &&
          stackPosition !== 0 &&
          "rgba(0, 0, 0, 0.1)") ||
        "rgba(0, 0, 0, 0)"}; /* Black w/ opacity */
      `}
    >
      <div
        className={css`
          position: absolute;
          top: 0;
          left: ${30 * stackPosition}px;
          background: white;
          width: 100vw;
          height: 100vh;
          min-width: 350px;
          width: calc(100vw - ${30 * stackPosition}px);
        `}
      >
        <Layout
          title={isCreation ? "New user" : `User ${userId}`}
          buttonText="Save"
          buttonAction={() => {
            doUpdate();
          }}
          close={close}
        >
          <NameEdit
            name={name}
            setname={setname}
            doUpdate={doUpdate}
            disabled={friendCreation}
          />
          {"error" in store && !friendCreation && (
            <ErrorBlock>{store.error}</ErrorBlock>
          )}
          <FriendsBox
            userId={userId}
            friends={friends}
            setFriends={setFriends}
            setfriendCreation={setfriendCreation}
          />
          {friendCreation && (
            <Modal>
              <CreateEdit
                stackPosition={stackPosition + 1}
                close={(num) => {
                  if (num !== undefined) {
                    setFriends([...friends, num]);
                  }
                  setfriendCreation(false);
                }}
              />
            </Modal>
          )}
        </Layout>
        <Modal>
          <PromptSaveAbort
            show={showPrompt}
            setshowModal={setShowPrompt}
            save={doUpdate}
            abort={close}
          />
        </Modal>
      </div>
    </div>
  );
}

export default memo(CreateEdit);
