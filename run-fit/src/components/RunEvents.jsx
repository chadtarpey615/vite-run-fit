import React from "react";
import { useDispatch, useSelector } from "react-redux";

const RunEvents = ({ event, deleteEvent }) => {
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    return <div>RunEvents</div>;
};

export default RunEvents;
