import { DirectionsRun, SettingsPowerRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";

const RunEvents = ({ event, deleteEvent }) => {
    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [updateEventData, setUpdataEventData] = useState({
        title: "",
        date: "",
        distance: null,
    });
    const dispatch = useDispatch();

    const onChange = (e) =>
        setUpdataEventData({
            ...updateEventData,
            [e.target.name]: e.target.value,
        });

    const handleOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const updatedEvent = async (id) => {
        if (!user) {
            alert("Please log in to update an event");
        }
        const eventUpdateInfo = {
            id: id,
            user: user._id,
            ...updateEventData,
            creator: user.username,
        };

        if (eventUpdateInfo) {
            await dispatch(updateEvent(eventUpdateInfo));
        }
    };

    const { title, date, distance, _id, creator } = event;

    return (
        <Card>
            <div className="flex flex-col text-white space-x-4 pb-4">
                <h1 className="px-4 my-4 text-2xl font-bold underline">
                    Event Title: <span>{title}</span>
                </h1>
                <h4 className="font-bold">Date: {date}</h4>
                <h4 className="font-bold">Distance: {distance}</h4>
                <h4 className="font-bold">Created By: {creator}</h4>
                <DirectionsRun />
                <h3 className="underline font-bold mt-4">Comments</h3>

                {/* map comments here in the future  */}

                <div className="card-btn flex justify-center"></div>
            </div>
        </Card>
    );
};

export default RunEvents;
