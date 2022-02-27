import React, { memo, useState } from "react";
import Modal from "../components/Modal";
import Error from "../components/Error";
import { useSharedStore } from "../components/Store";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
export interface IHomeProps {}

function Home({}: IHomeProps): JSX.Element {
  const [showModal, setshowModal] = useState(false);
  const [store] = useSharedStore();
  const navigate = useNavigate();
  return (
    <>
      <Layout
        title="Users"
        buttonText="new"
        buttonAction={() => navigate("/edit")}
      >
        {store.users.map((user, key) => (
          <Link key={key} to={`/edit/${user.id}`}>
            {user.name}
          </Link>
        ))}
      </Layout>
      <Modal>
        <Error show={showModal} setshowModal={setshowModal} />
      </Modal>
    </>
  );
}

export default memo(Home);
