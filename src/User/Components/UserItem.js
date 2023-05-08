import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./UserItem.css";

function UserItem(props) {
  return (
    <React.Fragment>
      <Link className="usersLink" to={`/users/places/${props.id}`}>
        <ul className="userlist">
          <li>
            <div className="image">
              <img
                style={{ width: "100px" }}
                src={`${process.env.REACT_APP_IMAGE_URL}/${props.imageUrl}`}
                alt={props.name}
                className="userImage"
              />
            </div>
          </li>
          <li className="details">
            <h1>{props.name}</h1>
            <p>{props.places.length} places</p>
          </li>
        </ul>
      </Link>
    </React.Fragment>
  );
}

export default UserItem;
