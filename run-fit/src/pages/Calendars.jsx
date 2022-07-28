import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calendars = () => {
    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col md:flex-row my-5 ">
                    <h1 className="mx-5 text-white text-4xl">Run Fit</h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-around ">
                <div className="flex ">
                    <DayPicker />
                </div>
                <div className="flex justify-center ">
                    <form
                        className="run-form sm:mt-5 md:mt-20"
                        // onSubmit={enterEventHandler}
                    >
                        <h1 className="text-white">Add run event form </h1>

                        <div className="flex ">
                            <label htmlFor="name"> </label>
                            <TextField
                                id="filled-required"
                                label="Add Event Name "
                                name="name"
                                variant="filled"
                                // onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="flex">
                            <label htmlFor="date"> </label>
                            <TextField
                                id="filled-basic"
                                // label={`${selectDay}`}
                                name="date"
                                variant="filled"
                                // onMouseEnter={(e) => setSelectDay(selectDay)}
                            />
                        </div>
                        <div>
                            <label htmlFor="distance"> </label>
                            <TextField
                                id="filled-basic"
                                label="Add Event Total Distance "
                                name="distance"
                                variant="filled"
                                // onChange={(e) => onChange(e)}
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
