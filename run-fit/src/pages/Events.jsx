import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "../../features/events/eventSlice";
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

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="text-white text-4xl my-8 underline shadow">
                    All Events
                </h1>
            </div>

            <div className="mt-16">
                {events?.map((event) => (
                    <Suspense>
                        <RunEvents event={event} removeEvent={removeEvent} />
                    </Suspense>
                ))}
            </div>
        </div>
    );
};

export default Events;
