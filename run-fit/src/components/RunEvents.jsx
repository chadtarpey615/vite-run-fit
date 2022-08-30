import { DirectionsRun, SettingsPowerRounded } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "./Card";
import {
    userUpdateEvent,
    addComment,
    deleteComment,
} from "../../features/events/eventSlice";
import { Divider } from "@mui/material";

const RunEvents = ({ event, removeEvent }) => {
    const { user } = useSelector((state) => state.user);
    const { events, isLoading } = useSelector((state) => state.events);
    const [open, setOpen] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [userComment, setUserComment] = useState("");
    const [commentEmail, setCommentEmail] = useState("");
    const [updateEventData, setUpdataEventData] = useState({
        title: "",
        date: "",
        distance: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("event", events);
    }, [event]);

    const onChange = (e) =>
        setUpdataEventData({
            ...updateEventData,
            [e.target.name]: e.target.value,
        });

    const handleOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);
    const handleComment = (e) => setOpenComment(true);
    const handleCommentClose = () => setOpenComment(false);

    const updatedEvent = async (id) => {
        if (!user) {
            alert("Please log in to update an event");
        } else {
            const eventUpdateInfo = {
                id: id,
                user: user._id,
                ...updateEventData,
                creator: user.username,
            };

            if (eventUpdateInfo) {
                dispatch(userUpdateEvent(eventUpdateInfo));
            }
        }
    };

    const addUserComment = async (e, id) => {
        e.preventDefault();
        console.log(e, commentEmail, id);
        if (!user) {
            alert("please log in first to continue");
        } else {
            const eventComment = {
                _id: id,
                name: commentEmail,
                comment: userComment,
            };

            dispatch(addComment(eventComment));
            handleCommentClose();

            // window.location.reload();
        }
    };

    const eventDeleteComment = async (e, event, id) => {
        console.log("runevents", event._id, id);

        const commentInfo = {
            event: event._id,
            comment: id,
        };

        dispatch(deleteComment(commentInfo));
        // window.location.reload();
    };

    const { title, date, distance, _id, creator } = event;

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Card>
            <div className="flex w-full">
                <div className="flex flex-col text-white space-x-4 pb-4">
                    <h1 className="px-4 my-4 text-2xl font-bold underline">
                        Event Title: <span>{title}</span>
                    </h1>
                    <h4 className="font-bold">Date: {date}</h4>
                    <h4 className="font-bold">Distance: {distance}</h4>
                    <h4 className="font-bold">Created By: {creator}</h4>
                    <DirectionsRun />

                    <h3 className="underline font-bold mt-4">Comments</h3>
                    {event.comments.map((comment) => (
                        <div>
                            <p className="text-sm font-bold text-white">
                                {comment.name} :
                                <span className="text-sm">
                                    {comment.comment}
                                </span>
                            </p>
                            <DeleteIcon
                                onClick={(e) =>
                                    eventDeleteComment(e, event, comment._id)
                                }
                            />
                            <Divider />
                        </div>
                    ))}
                </div>

                <div className="card-btn flex-col w-1/3 self-center  mx-4 ">
                    {user._id === event.user ? (
                        <button
                            className=" hover:bg-blue-500 w-full h-10 mt-10 rounded bg-blue-700 text-white text-sm md:text-md lg:text-lg"
                            onClick={(e) => removeEvent(e, _id)}
                        >
                            Delete Event
                        </button>
                    ) : (
                        <button
                            className=" hover:bg-blue-500 w-full h-10 my-4 rounded bg-blue-700 text-white text-sm md:text-md lg:text-lg"
                            disabled
                            onClick={(e) => removeEvent(e, _id)}
                        >
                            Not Authorized to Delete
                        </button>
                    )}

                    {user._id === event.user ? (
                        <button
                            className=" hover:bg-blue-500 w-full h-10 mt-4 rounded bg-blue-700 text-white text-sm md:text-md lg:text-lg"
                            onClick={(e) => handleOpen(_id)}
                        >
                            Update Event
                        </button>
                    ) : (
                        <button
                            className=" hover:bg-blue-500 w-full h-10 my-4 rounded bg-blue-700 text-white text-sm md:text-md lg:text-lg"
                            disabled
                            onClick={(e) => handleOpen(_id)}
                        >
                            Not Authorized to Update
                        </button>
                    )}
                    <button
                        className=" hover:bg-blue-500 w-full h-10 my-4 rounded bg-blue-700 text-white text-sm md:text-md lg:text-lg"
                        onClick={() => handleComment(_id)}
                    >
                        Add Comment
                    </button>

                    {open ? (
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Stack spacing={2}>
                                    <TextField
                                        id="filled-basic"
                                        label="Update Title"
                                        variant="filled"
                                        name="title"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Update Date"
                                        variant="filled"
                                        name="date"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Update Distance"
                                        variant="filled"
                                        name="distance"
                                        onChange={(e) => onChange(e)}
                                    />
                                    <Button
                                        onClick={() => updatedEvent(_id)}
                                        variant="outlined"
                                    >
                                        Update
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    ) : (
                        <Modal
                            open={openComment}
                            onClose={handleCommentClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Stack spacing={2}>
                                    <h3>Let's add a comment</h3>

                                    <TextField
                                        id="filled-basic"
                                        label="Email"
                                        variant="filled"
                                        name="username"
                                        onChange={(e) =>
                                            setCommentEmail(e.target.value)
                                        }
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Add Comment"
                                        variant="filled"
                                        name="comment"
                                        onChange={(e) =>
                                            setUserComment(e.target.value)
                                        }
                                    />
                                    <Button
                                        onClick={(e) => addUserComment(e, _id)}
                                        variant="outlined"
                                    >
                                        Add Comment
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default RunEvents;
