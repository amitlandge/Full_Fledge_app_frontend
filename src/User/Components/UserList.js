import React from "react";
import UserItem from "./UserItem";
import "./UserList.css";
function UserList(props) {
  let content = props.items.map((item) => {
    return (
      <UserItem
        id={item._id}
        name={item.name}
        places={item.places}
        imageUrl={item.imageUrl}
        key={item.id}
      />
    );
  });
  return <div className="userContainer">{content}</div>;
}

export default UserList;
