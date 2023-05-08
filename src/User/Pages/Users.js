import React, { useEffect, useState } from "react";
import UserList from "../Components/UserList";
import { useHttp } from "../../Hooks/httpRequest";
import ErrorModal from "../../Error/ErrorModal";

function Users() {
  const { error1, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const resData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/`);
      if (resData.response.ok) {
        setLoadedData(resData.responseData);
      }
      console.log(resData);
    };
    fetchUser();
  }, [sendRequest]);
  console.log(loadedData);
  const errorModalHandler = () => {
    clearError();
  };
  return (
    <div>
      <h1>All Users Here</h1>
      {error1 && (
        <ErrorModal error={error1.message} onCancel={errorModalHandler} />
      )}
      <UserList items={loadedData} />
    </div>
  );
}

export default Users;
