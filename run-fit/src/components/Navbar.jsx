import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { logoutUser } from "../../features/auth/authSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const [mobile, setMobile] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    // for future when user has friends to load
    useEffect(() => {
        if (user) {
            console.log(user);
            // dispatch(getUserFriends(user._id))
        }
    }, []);

    const logout = () => {
        dispatch(logoutUser());
    };

    const toggleMobile = () => {
        setMobile(!mobile);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const style = {
        position: "absolute",
        top: "18%",
        left: "93%",
        transform: "translate(-50%, -50%)",
        width: 150,
        bgcolor: "rgba(15,23,42, 0.1)",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <div className="bg-slate-900 px-4 max-w-full space-x-4 flex flex-row h-12 justify-between items-center">
                <div className="hidden md:flex md:flex-row">
                    <ul className="flex">
                        <li className=" mx-4">
                            <Link
                                className=" text-white"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="mx-2" onToggle>
                            <Link className="text-white" to="/users">
                                Users
                            </Link>
                        </li>
                        <li className="mx-2">
                            <Link className="text-white" to="/calendar">
                                Calendar
                            </Link>
                        </li>
                        <li className="mx-2">
                            <Link className="text-white" to="/events">
                                All Events
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex ">
                    <h1 className="text-white font-bold text-3xl">Run Fit</h1>
                    <button
                        onClick={toggleMobile}
                        className=" mx-4 md:hidden text-white"
                    >
                        <MenuIcon />
                    </button>
                </div>

                {user ? (
                    <div className="flex">
                        <ul>
                            <li className="text-white mx-2" aria-current="page">
                                <button onClick={handleOpen}>
                                    <EmojiPeopleIcon />
                                </button>
                                {user.username}
                            </li>
                        </ul>
                        <ul>
                            <li className="mx-2">
                                <Link
                                    onClick={logout}
                                    className="text-yellow-900 bg-yellow-400 p-2 hover:bg-yellow-800 hover:text-yellow-200 transition duration-300 rounded "
                                    aria-current="page"
                                    to="/login"
                                >
                                    Log Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <ul className="">
                            <li className="mx-2">
                                <Link
                                    className="text-white"
                                    aria-current="page"
                                    to="/signup"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="mx-2">
                                <Link
                                    className="text-yellow-900 bg-yellow-400 p-2 hover:bg-yellow-800 hover:text-yellow-200 transition duration-300"
                                    aria-current="page"
                                    to="/login"
                                >
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {mobile && (
                <div className="mobile md:hidden px-4 bg-slate-900 ">
                    <ul>
                        <li className="mx-2">
                            <Link
                                className=" text-white"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <li className="mx-2" onToggle>
                            <Link className="text-white" to="/users">
                                Users
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="mx-2">
                            <Link className="text-white" to="/calendar">
                                Calendar
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="mx-2">
                            <Link className="text-white" to="/events">
                                All Events
                            </Link>
                        </li>
                    </ul>
                </div>
            )}

            {user && open && (
                <>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack spacing={2}>
                                <p className="text-info">Friends</p>
                                <hr />
                                {friends.map((friend) => (
                                    <h6 className="text-white">{friend}</h6>
                                ))}
                            </Stack>
                        </Box>
                    </Modal>
                </>
            )}
        </>
    );
};

export default Navbar;
