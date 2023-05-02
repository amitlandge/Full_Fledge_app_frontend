import React, { useContext, useState } from "react";
import "./PlacesItem.css";
import Modal from "../../UI/Components/Modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHttp } from "../../Hooks/httpRequest";
import AuthContext from "../../Context/auth-context";
import Map1 from "../../UI/Components/Map";
const PlacesItem = (props) => {
  const ctx = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const placeId = props.id;
  const [showMap, setShowMap] = useState(false);
  const onShowMapHandler = () => {
    setShowMap(true);
  };
  const onHideOverlay = () => {
    setShowMap(false);
  };
  const deletePlaceHandler = async () => {
  
    try {
      props.onDelete(placeId);
      await sendRequest(
        `http://localhost:4000/api/places/${placeId}`,
        "DELETE",
        null,
        {
          authorization: "bearer " + ctx.token,
        }
      );
      
    } catch (error) {}
  };
  return (
    <React.Fragment>
      {showMap && (
        <Modal address={props.address} hideMap={onHideOverlay}>
          <Map1 location={props.location} />
        </Modal>
      )}
      <div className="placeItemContainer">
        <div className="imageContainer">
          <img className="placeImage" src={`http://localhost:4000/${props.imageUrl}`} alt={props.name} />
        </div>
        <div className="placeDetails">
          <h1>{props.title}</h1>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
          <div className="buttons">
            <button onClick={onShowMapHandler}>VIEW ON MAP</button>
            {ctx.isLoggenedIn && <Link to={`/place/${placeId}`} className="editBtn">EDIT</Link>}
            {ctx.isLoggenedIn && (
              <button onClick={deletePlaceHandler}>DELETE</button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlacesItem;
