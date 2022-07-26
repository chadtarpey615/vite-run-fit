import eventService from './eventService'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    events: [],
    // comments: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getEvents = createAsyncThunk("events/all", async (data) => {

    try
    {
        return await eventService.getEvents()
    } catch (error)
    {

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


export const deleteEvent = createAsyncThunk('events/delete', async (id, thunkAPI) => {

    try
    {
        const token = thunkAPI.getState().user.user.token
        return await eventService.deleteEvent(id, token)
    } catch (error)
    {
        console.log(error)
    }

}
)

export const userUpdateEvent = createAsyncThunk('events/update', async (data, thunkAPI) => {
    console.log("hitiit")
    try
    {
        const token = thunkAPI.getState().user.user.token
        return await eventService.updateEvent(data, token)
    } catch (error)
    {
        console.log(error)
    }

}
)

export const addComment = createAsyncThunk('events/comment', async (data, thunkAPI) => {
    console.log("hitiit eslice", data)
    try
    {
        return await eventService.addComment(data)
    } catch (error)
    {
        console.log(error)
    }

}
)


export const deleteComment = createAsyncThunk('events/deleteComment', async (commentInfo, thunkAPI) => {
    const { event, comment } = commentInfo
    console.log("eventSlice", event, comment)

    try
    {
        return await eventService.deleteComment(event, comment)
    } catch (error)
    {
        console.log(error)
    }

})


export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.isLoading = true
        }),
            builder.addCase(getEvents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
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
            }),
            builder.addCase(deleteEvent.pending, (state, action) => {
                state.isLoading = true
            }),
            builder.addCase(deleteEvent.fulfilled, (state, action) => {
                console.log("delete eventssss", action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.message = "Event deleted successfully"
            }
            ),
            builder.addCase(deleteEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.error.message
            }
            ),
            builder.addCase(userUpdateEvent.pending, (state, action) => {
                state.isLoading = true
            }
            ),
            builder.addCase(userUpdateEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.events = action.payload
            }),
            builder.addCase(userUpdateEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.error.message
            }
            ),
            builder.addCase(addComment.pending, (state, action) => {
                state.isLoading = true
            }
            ).
                addCase(addComment.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.events.comments = action.payload
                }).addCase(addComment.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.error.message
                }).
                addCase(deleteComment.pending, (state) => {
                    state.isLoading = true
                }),
            builder.addCase(deleteComment.fulfilled, (state, action) => {
                console.log("comment case", state.event)
                state.isLoading = false
                state.isSuccess = true
                state.comments = state.events.comments.filter(comment => comment.comments !== action.payload)
            }
            )
    }
})


export default eventSlice.reducer
