import axios from "axios";

const API_URL = "http://localhost:3000/api/users/";

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
    const response = await axios.get(`${API_URL}/allUsers`);
    return response.data;
}


const authService = {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers
}

export default authService;