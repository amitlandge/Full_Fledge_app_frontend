import React, { useContext, useEffect, useState } from "react";
import "../../UI/Components/Input.css";
import { useHttp } from "../../Hooks/httpRequest";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../Context/auth-context";
const UpdatePlace = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let nameIsValid = title.trim().length > 0;
  let desIsValid = description.trim().length > 5;
  let [submit, setSubmit] = useState(false);
  const ctx = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const history = useHistory();
  const param = useParams();
  console.log(param);
  const onSubmitDataHandler = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (nameIsValid && desIsValid) {
    }
    const res = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/places/${param.placeId}`,
      "PUT",
      JSON.stringify({
        title,
        description,
      }),
      {
        "Content-Type": "application/json",
        authorization: "bearer " + ctx.token,
      }
    );
    if (res.response.ok) {
      history.goBack();
    }
    console.log(res);
  };
  useEffect(() => {
    console.log(param.placeId);
    const fetchData = async () => {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${param.placeId}/user`,
        "GET",
        null,
        {
          authorization: "bearer " + ctx.token,
        }
      );
     
      setTitle(res.responseData.title);
      setDescription(res.responseData.description);
    };
    fetchData();
  }, [param, sendRequest, ctx.token]);
  return (
    <form onSubmit={onSubmitDataHandler} className="form_controls">
      <div className={`form_control ${!nameIsValid && submit && "invalid"}`}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>
      <div className={`form_control ${!desIsValid && submit && "invalid"}`}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        {!desIsValid && submit && (
          <p className="errorMessage">Description must be above 5 Charector</p>
        )}
      </div>
      <button className="btn">Add Place</button>
    </form>
  );
};

export default UpdatePlace;
