import React, { useContext, useState } from "react";
import "../../UI/Components/Input.css";
import { useHttp } from "../../Hooks/httpRequest";
import AuthContext from "../../Context/auth-context";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../UI/Components/ImageUpload";
const AddPlace = () => {
  const ctx = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [touch, setTouch] = useState(false);
  const [image, setImage] = useState();
  const [imageIsValid, setImageIsValid] = useState(false);
  const history = useHistory();
  let titleIsValid = title.trim().length > 0;
  let descriptionIsValid = description.trim().length > 5;
  let addressIsValid = address.trim().length > 5;
  const { sendRequest } = useHttp();
  const onSubmitDataHandler = async (e) => {
    e.preventDefault();
    setTouch(true);
    if (titleIsValid && descriptionIsValid && addressIsValid && imageIsValid) {
      console.log("valid");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("userId", ctx.userId);
      formData.append("image", image);
      const res = await sendRequest(
        "http://localhost:4000/api/places/",
        "POST",
        formData,
        {
          authorization: "bearer " + ctx.token,
        }
      );

      if (res.response.ok) {
        history.push("/users");
      }
    }
  };
  const placeImageHandler = (id, imagefile, isValid) => {
    setImage(imagefile);
    setImageIsValid(isValid);
  };
  return (
    <div>
      <form className="form_controls" onSubmit={onSubmitDataHandler}>
        <div className={`form_control ${!titleIsValid && touch && "invalid"}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div
          className={`form_control ${
            !descriptionIsValid && touch && "invalid"
          }`}
        >
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {!descriptionIsValid && touch && (
            <p className="errorMessage">
              Description must be above 5 Charector
            </p>
          )}
        </div>
        <ImageUpload id="image" onInput={placeImageHandler} />
        <div
          className={`form_control  ${!addressIsValid && touch && "invalid"}`}
        >
          <label htmlFor="address">Address</label>
          <input
            type="address"
            placeholder="Enter Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <button className="btn">Add Place</button>
      </form>
    </div>
  );
};

export default AddPlace;
