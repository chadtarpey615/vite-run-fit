import React from "react";

const Card = (props) => {
    return <div className="flex border-2">{props.children}</div>;
};

export default Card;
