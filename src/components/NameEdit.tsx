import React from "react";

export interface INameEditProps {
  name: string;
  setname(value: string): void;
  doUpdate(): void;
}

function NameEdit(
  props: INameEditProps & React.HTMLProps<HTMLInputElement>
): JSX.Element {
  const { name, setname, doUpdate, ...inputProps } = props;

  return (
    <>
      <input
        type={"text"}
        placeholder="name"
        style={{ width: "234px" }}
        value={name}
        onChange={(e) => setname(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            doUpdate();
          }
        }}
        {...inputProps}
      />
    </>
  );
}

export default NameEdit;
