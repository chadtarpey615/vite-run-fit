import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "../../features/events/eventSlice";
import RunEvents from "../components/RunEvents";
const Events = () => {
    const { events, isLoading } = useSelector((state) => state.events || {});
    const dispatch = useDispatch();

    const removeEvent = async (e, id) => {
        console.log("ididididid", id);
        await dispatch(deleteEvent(id));
    };

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="text-white text-4xl my-8 underline shadow">
                    All Events
                </h1>
            </div>

            <div className="mt-16">
                {events.map((event) => (
                    <RunEvents event={event} removeEvent={removeEvent} />
                ))}
            </div>
        </div>
    );
};

export default Events;
