import axios from "axios";

const API_URL = "http://localhost:3003/api/events/";


const getEvents = async (events) => {
    const response = await axios.get(`${API_URL}/all-events`);
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
    console.log("********", id)
    try 
    {
        const response = await axios.get(`${API_URL}${id}`)
        return response.data
    } catch (error)
    {
        console.log(error)
    }
}

const updateEvent = async (eventData, token) => {
    const { user, title, date, distance, id } = eventData

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const updatedEvent = {
        id,
        title,
        date,
        distance,
        creator: user

    }

    const response = await axios.put(`${API_URL}/all-events/${id}`, updatedEvent, config)
    return response.data
}


const addComment = async (data) => {
    console.log("comments", data)
    const comment = {
        name: data.name,
        comment: data.comment
    }

    try
    {
        const response = await axios.post(`${API_URL}/${data._id}`, comment)
        return response.data
    } catch (error)
    {
        console.log(error)
    }

}



const eventService = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    addComment

}


export default eventService;