import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png"
import "./Logo.css" 

const Logo = () => {
    return (
        <div className= "flexbox ma4 mt0">
            <Tilt className="Logo" tiltMaxAngleX={35} tiltMaxAngleY={35}>
                <div className="br2 shadow-2" style={{ height: "150px", width: "150px" }}>
                    <img src={brain} alt="brain"/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;