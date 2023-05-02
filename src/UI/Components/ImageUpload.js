import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
const ImageUpload = (props) => {
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const popUpImageHandler = () => {
    imageRef.current.click();
  };
  const imagePiker = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  
  return (
    <div className="form_control">
      <input
        type="file"
        style={{ display: "none" }}
        ref={imageRef}
        onChange={imagePiker}
        accept=".jpg,.png,.jpeg"
      />
      <div className="image_preview">
        <img src={preview} alt="preview" className="image_pre" id={props.id} />
      </div>
      <button onClick={popUpImageHandler} type="button">
        PICK THE IMAGE
      </button>
    </div>
  );
};

export default ImageUpload;
