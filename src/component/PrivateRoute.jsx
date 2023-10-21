import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error from "./Assets/Error404/Error";

const PrivateRoute = (props) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("access token");
    if (!userToken || userToken === undefined || userToken == null) {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };

  console.log(isLoggedIn);
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        props.children
      ) : (
        <Routes>
          <Route path="/error" element={<Error />} />
        </Routes>
      )}
    </>
  );
};

export default PrivateRoute;
