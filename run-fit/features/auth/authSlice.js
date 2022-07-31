import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    users: [],
    friends: [],
    userError: false,
    userSuccess: false,
    isLoading: false,
    userMessage: "",
}

export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
    console.log("regitser hit in auth slice", user)

    try
    {
        return await authService.registerUser(user)
    } catch (error)
    {
        console.log(error)
    }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
    console.log("login hit in auth slice", user)

    try
    {
        return await authService.loginUser(user)
    }
    catch (error)
    {
        console.log(error)
    }

})

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    console.log("get users hit in auth slice")

    try
    {
        return await authService.getAllUsers()
    }
    catch (error)
    {
        console.log(error)
    }

})





export const userAuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
        }),
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.userSuccess = true
                state.userMessage = "User created successfully"
            }),
            builder.addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.userError = true
                state.userMessage = action.error.message
            }),
            builder.addCase(loginUser.pending, (state, action) => {
                state.isLoading = true
            }),
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.userSuccess = true
                state.userMessage = "User logged in successfully"
            }),
            builder.addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.userError = true
                state.userMessage = action.error.message
            }),

            builder.addCase(getUsers.pending, (state, action) => {
                state.isLoading = true
            }
            ),
            builder.addCase(getUsers.fulfilled, (state, action) => {
                console.log("get user case", state)
                state.isLoading = false
                state.users = action.payload
            }
            ),
            builder.addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.userError = true
                state.userMessage = action.error.message
            }
            )
    }

})



export default userAuthSlice.reducer