import React from "react";
import "./Concept.css";

const Concept = ({concept}) => {

    const formatAsPercent = (number) => {
        return `${parseFloat(number * 100).toFixed(1)}%`;
    }
    return <li key={concept.id}>
        <span>{concept.name}</span>
        <span>{formatAsPercent(concept.value)}</span>
    </li>
}

export default Concept;