import axios from "axios";

const API_URL = "http://localhost:3003/api/events/";


const getEvents = async (events) => {
    const response = await axios.get(`${API_URL}all-events`);
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



const deleteEvent = async (id, token) => {
    try 
    {
        const response = await axios.get(`${API_URL}${id}`)
        return response.data
    } catch (error)
    {
        console.log(error)
    }
}


const eventService = {
    getEvents,
    createEvent,
    deleteEvent

}


export default eventService;