import React from "react";

interface Props {
  name: string;
  value: string;
  accept?: string;
  setFile: (file: File) => void;
  style?: object;
  icon?: string | JSX.Element;
  props?: any;
}

export default function MyFileInput({
  name,
  value,
  accept,
  setFile,
  style,
  icon,
  props,
}: Props) {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const buttonFile = React.useRef<HTMLButtonElement>(null);

  function ChooseFile() {
    inputFile.current?.click();
  }

  function AddFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const name = e.target.files[0].name;
      buttonFile.current!.innerText = name;
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="my-file-input">
      <button ref={buttonFile} type="button" style={style} onClick={ChooseFile}>
        <span>{value}</span>
        {icon ? typeof icon === "string" ? <i className={icon}></i> : icon : ""}
      </button>
      <input
        {...props}
        type="file"
        id="file"
        name="name"
        ref={inputFile}
        style={{ display: "none" }}
        accept={accept}
        onChange={AddFile}
      />
    </div>
  );
}
