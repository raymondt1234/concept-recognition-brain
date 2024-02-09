import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={imageURL} alt="" width="500px" height="auto" />
                <div
                    className="bounding-box"
                    style={{
                        top: boxes.topRow,
                        right: boxes.rightCol,
                        bottom: boxes.bottomRow,
                        left: boxes.leftCol,
                    }}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;