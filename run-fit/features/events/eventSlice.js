import eventService from './eventService'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    events: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getEvents = createAsyncThunk('events/all', async (data) => {
    try
    {
        const response = await eventService.getEvents()
        return response.data
    } catch (error)
    {
        console.log(error)
    }
})

export const createEvent = createAsyncThunk('events/create', async (data, thunkAPI) => {
    console.log("hiiitttt slice")
    try
    {
        const token = thunkAPI.getState().user.user.token
        return await eventService.createEvent(data, token)
    } catch (error)
    {
        console.log(error)
    }
})


export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state, action) => {
            state.isLoading = true
        }),
            builder.addCase(getEvents.fulfilled, (state, action) => {
                state.isLoading = false
                state.events = action.payload
            }),
            builder.addCase(getEvents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.error.message
            }),
            builder.addCase(createEvent.pending, (state, action) => {
                state.isLoading = true
            }),
            builder.addCase(createEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = "Event created successfully"
            }),
            builder.addCase(createEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.error.message
            })
    }
})


export default eventSlice.reducer
