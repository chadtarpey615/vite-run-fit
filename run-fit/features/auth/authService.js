import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data)
    {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}



const authService = {
    registerUser,
}

export default authService;