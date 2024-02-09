import React from "react";
import "./ConceptsDisplay.css";

const ConceptsDisplay = ({ concepts }) => {

    const formatAsPercent = (number) => {
        return `${parseFloat(number * 100).toFixed(1)}%`;
    }

    const listConcepts = concepts.map(concept => {
        return <li key={concept.id}><span>{concept.name}</span> <span>{formatAsPercent(concept.value)}</span></li>
    });


    return (
        <div className="displayDiv">
            <h2>Concepts in the Image</h2>
            <ol>
                {listConcepts}
            </ol>
        </div>
    );
}

export default ConceptsDisplay;