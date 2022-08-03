import { DirectionsRun, SettingsPowerRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "./Card";
import { userUpdateEvent, addComment } from "../../features/events/eventSlice";

const RunEvents = ({ event, removeEvent }) => {
    const { user } = useSelector((state) => state.user);
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

    const addUserComment = async (id) => {
        console.log(commentEmail);
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

            // window.location.reload()
        }
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

            <div className="card-btn flex justify-center ">
                {user._id === event.user ? (
                    <button
                        className=" hover:bg-blue-500 w-20 h-20 rounded bg-blue-700 text-white"
                        onClick={(e) => removeEvent(e, _id)}
                    >
                        Delete Event
                    </button>
                ) : (
                    <button
                        className="hover:bg-blue-500 w-20 h-20 rounded bg-blue-700 text-white"
                        disabled
                        onClick={(e) => removeEvent(e, _id)}
                    >
                        Not Authorized to Delete
                    </button>
                )}
                {user._id === event.user ? (
                    <button
                        className="hover:bg-blue-500 w-20 h-20 rounded bg-blue-700 text-white"
                        onClick={(e) => handleOpen(_id)}
                    >
                        Update Event
                    </button>
                ) : (
                    <button
                        className="hover:bg-blue-500 w-20 h-20 rounded bg-blue-700 text-white"
                        disabled
                        onClick={(e) => handleOpen(_id)}
                    >
                        Not Authorized to Update
                    </button>
                )}
                <button
                    className="hover:bg-blue-500 w-20 h-20 rounded bg-blue-700 text-white"
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
                                    onClick={() => addUserComment(_id)}
                                    variant="outlined"
                                >
                                    Add Comment
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                )}
            </div>
        </Card>
    );
};

export default RunEvents;
