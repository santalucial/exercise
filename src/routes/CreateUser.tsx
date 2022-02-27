import React, { memo } from "react";
import CreateEdit from "../components/CreateEdit";

export interface ICreateUserProps {}

function CreateUser({}: ICreateUserProps): JSX.Element {
  return <CreateEdit />;
}

export default memo(CreateUser);
