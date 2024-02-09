import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = ({ imageURL }) => {
    return <img id="imageDisplay" src={imageURL} alt="" />
}

export default ImageDisplay;