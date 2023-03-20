import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../common/constants";
import { UserRoles } from "../../common/types";
import { signIn, signOut, signUp } from "./auth.thunk";



interface AuthState{
    isAuthorized: boolean,
    token: string,
    user:{
        role: UserRoles,
        name: string,
        email: string
    }
}


const getInitialState = () => {
    const jsonData = localStorage.getItem(STORAGE_KEYS.AUTH)
    if (jsonData) {
        const userData = JSON.parse(jsonData) as Omit<AuthState, 'isAuthorized'>
        return {
            isAuthorized: true,
            token: userData.token,
            user:{
                name: userData.user.name,
                email: userData.user.email,
                role: userData.user.role
            }
        }
    }
    return {
        isAuthorized: false,
            token: '',
            user:{
                name: '',
                email: '',
                role: UserRoles.GUEST
            }
    }
}



const initialState: AuthState = getInitialState()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            state.isAuthorized = true
            state.token = payload.token

            state.user = {
                name: payload.user.name,
                email: payload.user.email,
                role: payload.user.role,
            }
        }),
        builder.addCase(signIn.fulfilled, (state,{ payload }) => {
            state.isAuthorized = true
            state.token = payload.token

            state.user = {
                name: payload.user.name,
                email: payload.user.email,
                role: payload.user.role,
            }
        }),
        builder.addCase(signOut.fulfilled, (state) => {
            state.isAuthorized = false
            state.token = ''

            state.user = {
                name: '',
                email:  '',
                role: UserRoles.GUEST,
            }
        })

    }

})

export const authActions = authSlice.actions

export default authSlice