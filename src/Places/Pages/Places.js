import React, { useEffect, useState } from "react";
import PlacesList from "../Components/PlacesList";
import { useHttp } from "../../Hooks/httpRequest";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ErrorModal from "../../Error/ErrorModal";

const Places = () => {
  const { error1, sendRequest, clearError } = useHttp();
  const param = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await sendRequest(
        `http://localhost:4000/api/places/${param.placeId}`
      );

      if (res.response.ok) {
        setPlaces(res.responseData.getPlace);
      }
    };
    fetchData();
  }, [param.placeId, sendRequest]);
  const deletPlaceHandler = (id) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));
  };

  const errorModalHandler = () => {
    clearError();
  };
  return (
    <div>
      <h1>Places</h1>
      {error1 && (
        <ErrorModal error={error1.message} onCancel={errorModalHandler} />
      )}
      <PlacesList places={places} deletePlace={deletPlaceHandler} />
    </div>
  );
};

export default Places;
