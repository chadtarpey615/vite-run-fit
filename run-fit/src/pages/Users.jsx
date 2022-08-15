import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import image from "..//images/avatar.jpeg";
import PeopleIcon from "@mui/icons-material/People";

const Users = () => {
    const { user, users, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getAllUsers = async () => {
        await dispatch(getUsers());
    };

    const addFriend = async (friend, data) => {
        console.log("friends", data);
        await dispatch(addFriend({ friend, data }));
    };

    useEffect(() => {
        getAllUsers();
    }, []);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <div className="flex justify-center text-white my-5">
                <h1 className="text-4xl">Run Fit Users</h1>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-around">
                {users ? (
                    users.map((data) => (
                        <div className="mx-auto border-2">
                            <Card>
                                <div className="flex w-68 justify-start">
                                    <img
                                        className="rounded-circle shadow-xl w-1/3"
                                        src={image}
                                        alt="Avatar"
                                    />
                                    <div className="flex flex-col justify-center w-1/3">
                                        {user.username === data.username ? (
                                            <h1 className="mx-2 my-5 text-white text-2xl">
                                                {data.username}
                                            </h1>
                                        ) : (
                                            <h1 className="mx-2 my-5 text-white text-2xl">
                                                {data.username}
                                            </h1>
                                        )}

                                        <p className="text-white">
                                            Events: {data.events.length}
                                        </p>
                                        <p className="text-white">
                                            Friends: {data.friends.length}
                                        </p>
                                        <button
                                            className="text-white"
                                            onClick={() =>
                                                addFriend(user, data)
                                            }
                                        >
                                            <PeopleIcon />
                                            Add Friends
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <h1 className="text-white">No Users</h1>
                )}
            </div>
        </div>
    );
};

export default Users;
