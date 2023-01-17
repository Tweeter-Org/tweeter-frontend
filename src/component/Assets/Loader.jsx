import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap';

const Loader = (props) => {
   
  return <>
<Spinner animation="border" variant="light" id="loadSpinner" style={{
   "zIndex": "200",
    "position": "fixed",
    "top": "45vh",
    "left": "50vw"
}} />
  </>
}

export default Loader