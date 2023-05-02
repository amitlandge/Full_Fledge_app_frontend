import React, { useReducer } from "react";
import "./Input.css";
const inputReducer = (state, action) => {
  
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };

    default:
      return state;
  }
};
const Input = (props) => {
  const [inputeState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const onChangeHandler = (e) => {
    dispatch({ type: "CHANGE", val: e.target.value });
  };
  console.log(inputeState);
  let content =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        onChange={onChangeHandler}
        value={inputeState.value}
      />
    ) : (
      <textarea rows={29} cols={10} />
    );
  return (
    <div className={`form_controls ${!inputeState.isValid && "form_controls invalid"}`}>
      <label htmlFor="title">Title </label>
      {content}
    </div>
  );
};

export default Input;
