import React from "react";
import "./ConceptsDisplay.css";
import Concept from "../Concept/Concept";

const ConceptsDisplay = ({ concepts }) => {

    const listConcepts = concepts.map(concept => {
        return <Concept concept={concept} />
    });
    

    return (
        <div className="displayDiv">
            <h2 id="conceptHeading" hidden={concepts.length > 0 ? false : true}>
                Concepts found in the Image
            </h2>
            <ol>
                {listConcepts}
            </ol>
        </div>
    );
}

export default ConceptsDisplay;