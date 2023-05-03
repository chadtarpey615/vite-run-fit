import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "../../features/events/eventSlice";
import Spinner from "../components/Spinner";
const RunEvents = lazy(() => import("../components/RunEvents"));

const Events = () => {
    const { events, isLoading } = useSelector((state) => state.events);
    const dispatch = useDispatch();

    const removeEvent = async (e, id) => {
        console.log("ididididid", id);
        await dispatch(deleteEvent(id));
    };

    useEffect(() => {
        console.log(events);
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="text-white text-4xl my-8 underline shadow">
                    All Events
                </h1>
            </div>

            <div className="mt-16 flex flex-col md:flex-row">
                {events?.map((event) => (
                    <Suspense key={event.id}>
                        <RunEvents event={event} removeEvent={removeEvent} />
                    </Suspense>
                ))}
            </div>
        </div>
    );
};

export default Events;
