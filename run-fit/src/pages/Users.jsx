import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const Users = () => {
    const {users} = useSelector(state => state.users);
const dispatch = useDispatch();

    useEffect(() => {   

    return <div>Users coming soon</div>;
};

export default Users;
