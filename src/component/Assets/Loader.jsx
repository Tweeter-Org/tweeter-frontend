import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.css"

const Loader = () => {
  return (
    <>
        <div className="overlay">
          <Spinner
            animation="border"
            variant="light"
            id="loadSpinner"
            style={{
              zIndex: "200",
              position: "fixed",
              top: "45vh",
          left: "50vw",
            }}
          />
        </div>

    </>
  );
};

export default Loader;

