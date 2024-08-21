import React, { useState } from "react";

const FileInput = ({ accept, id, fileHandleFun, text }) => {
  const [fileSelected, setFileSelected] = useState("");

  function onChange(e) {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFun(e.target.files[0]);
  }

  return (
    <>
      <label htmlFor={id} className={`custom-input ${!fileSelected && "label-input"}`}>
        {fileSelected
          ? `The ${fileSelected} File Selected`
          : `${text}`}
      </label>

      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
};

export default FileInput;
