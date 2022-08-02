import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { createEvent, getEvents } from "../../features/events/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Spinner from "../components/Spinner";
import "../styles/calendar.css";
const Calendars = () => {
    const { user, isLoading } = useSelector((state) => state.user);
    const [selectedDay, setSelectedDay] = useState(null);
    const [eventData, setEventData] = useState({
        title: "",
        distance: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const onChange = (e) =>
        setEventData({ ...eventData, [e.target.name]: e.target.value });

    const enterEventHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please log in to create an event");
        }

        const newEvent = {
            user: user._id,
            ...eventData,
            date: selectedDay,
            creator: user.username,
        };

        dispatch(createEvent(newEvent));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col md:flex-row my-5 ">
                    <h1 className="mx-5 text-white text-4xl">Run Fit</h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-around ">
                <div className="flex ">
                    <DayPicker onDayClick={(e) => setSelectedDay(e)} />
                </div>
                <div className="flex justify-center ">
                    <form
                        className="run-form sm:mt-5 md:mx-10"
                        onSubmit={enterEventHandler}
                    >
                        <h1 className="text-white">Add run event form </h1>

                        <div className="flex ">
                            <label htmlFor="title"> </label>
                            <TextField
                                id="filled-required"
                                label="Add Event Name "
                                name="title"
                                variant="filled"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="flex">
                            <label htmlFor="date"> </label>
                            <TextField
                                id="filled-basic"
                                label={`${selectedDay}`}
                                name="date"
                                variant="filled"
                                onMouseEnter={(e) =>
                                    setSelectedDay(selectedDay)
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="distance"> </label>
                            <TextField
                                id="filled-basic"
                                label="Add Event Total Distance "
                                name="distance"
                                variant="filled"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="mt-2">
                            <button className="text-sm p-2 bg-blue-600 text-white hover:bg-blue-800 transition duration-300">
                                Enter Event
                            </button>
                            <button className="text-sm p-2 bg-blue-600  hover:bg-blue-800 transition duration-300">
                                <Link to="events">See All Events</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Calendars;
