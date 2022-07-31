import axios from "axios";

const API_URL = "http://localhost:3001/api/events/";


const getEvents = async (events) => {
    const response = await axios.get(API_URL);
    return response.data;
}


const createEvent = async (eventData, token) => {

    console.log("hiiitttt")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }

    }
    const response = await axios.post(API_URL, eventData, config);
    return response.data;
}


const eventService = {
    getEvents,
    createEvent,

}


export default eventService;