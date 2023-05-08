import React, { useContext, useState } from "react";
import "../../UI/Components/Input.css";
import AuthContext from "../../Context/auth-context";
import ErrorModal from "../../Error/ErrorModal";
import { useHttp } from "../../Hooks/httpRequest";
import ImageUpload from "../../UI/Components/ImageUpload";
const Auth = () => {
  const ctx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [signup, setSignup] = useState(false);
  const [image, setImage] = useState();

  let nameIsValid = name.trim().length > 0;
  let emailIsValid = email.trim().includes("@");
  let passIsValid = password.trim().length > 5;
  const { error1, sendRequest, clearError } = useHttp();
  const onSwitchAccount = () => {
    setSignup((pre) => (pre = !pre));
  };
  const onSubmitDataHandler = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (signup) {
      console.log("sign up mode");
      if (nameIsValid && emailIsValid && passIsValid) {
        try {
          const formData = new FormData();
          formData.append("email", email);
          formData.append("name", name);
          formData.append("password", password);
          formData.append("image", image);
          const res = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/user/signup/`,
            "POST",
            formData
          );
          console.log(res);
          if (res.response.ok) {
            ctx.login(res.responseData.id, res.responseData.token);
          }
        } catch (error) {}
      }
    }
    if (!signup) {
      if (emailIsValid && passIsValid) {
        try {
          const res = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/user/signin`,
            "POST",
            JSON.stringify({
              email,
              password,
            }),
            {
              "Content-Type": "application/json",
            }
          );

          if (res.response.ok) {
            ctx.login(res.responseData.id, res.responseData.token);
          }
        } catch (error) {}
      }
    }
  };

  const errorModalHandler = () => {
    clearError();
  };
  const getImageHandler = (id, imagefile, isValid) => {
    setImage(imagefile);
  };
  return (
    <div>
      {error1 && (
        <ErrorModal error={error1.message} onCancel={errorModalHandler} />
      )}
      <form onSubmit={onSubmitDataHandler} className="form_controls">
        {signup && (
          <div
            className={`form_control ${!nameIsValid && submit && "invalid"}`}
          >
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        )}
        {signup && <ImageUpload id="image" onInput={getImageHandler} />}
        <div className={`form_control ${!emailIsValid && submit && "invalid"}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Your Email"
          />
          {!emailIsValid && submit && (
            <p className="errorMessage">email must contain @</p>
          )}
        </div>
        <div className={`form_control ${!passIsValid && submit && "invalid"}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn">{!signup ? "Sign In" : "Sign Up"}</button>
        <button className="btn" type="button" onClick={onSwitchAccount}>
          {!signup ? "Switch To Sign Up" : "Switch To Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
