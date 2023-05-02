import axios from "axios";
import { toast } from 'react-toastify'
const API_URL = "http://localhost:3003/api/users/";

const registerUser = async (userData) => {
    console.log("service", API_URL)
    const response = await axios.post(API_URL, userData);
    if (response.data)
    {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}


const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data)
    {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

const logoutUser = async () => localStorage.removeItem("user");


const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    // console.log("response", response)
    return response.data;
}

const addNewFriend = async (friend, data) => {
    console.log("authserv friend", friend, data._id)
    try
    {
        const response = await axios.post(`${API_URL}${data._id}/${friend}`)

        return response.data
    } catch (error)
    {
        console.log(error)
    }

}

const getUserFriends = async (id) => {
    const response = await axios.get(`/api/users/${id}`)
    console.log(response.data)
    return response.data
}


const authService = {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    addNewFriend,
    getUserFriends
}

export default authService;