import React from "react";
import PlacesItem from "./PlacesItem";
import "./PlacesList.css";
const PlacesList = (props) => {
  const content = props.places.map((item) => {
    return (
      <PlacesItem
        key={item.id}
        id={item._id}
        title={item.title}
        address={item.address}
        location={item.location}
        imageUrl={item.imageUrl}
        description={item.description}
        userId={item.userId}
        onDelete={props.deletePlace}
      />
    );
  });
  return <div className="placeListContainer">{content}</div>;
};

export default PlacesList;
