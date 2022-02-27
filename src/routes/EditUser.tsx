import React, { memo } from "react";
import { useParams } from "react-router-dom";
import CreateEdit from "../components/CreateEdit";

export interface IEditUserProps {}

function EditUser({}: IEditUserProps): JSX.Element {
  let { userId } = useParams();

  const id = parseInt(userId!);
  return <CreateEdit userId={id} />;
}

export default memo(EditUser);
