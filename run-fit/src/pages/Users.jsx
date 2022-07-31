import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/auth/authSlice";
const Users = () => {
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const getAllUsers = async () => {
        await dispatch(getUsers());
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return <div>Users coming soon</div>;
};

export default Users;
