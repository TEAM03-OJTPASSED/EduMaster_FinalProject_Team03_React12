import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    register :{
        loading:false,
        success:false,
        message:""
    }
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        registerPending: (state)=>{
            state.register.loading= true
            state.register.success =false
            state.register.message = ""
        },
        registerFulfilled: (state)=>{
            state.register.loading= false
            state.register.success= true
            state.register.message = "Register successfully"
        },
        registerRejected: (state)=>{
            state.register.loading= false
        },
    }
})

export const {registerFulfilled, registerPending, registerRejected} = usersSlice.actions
export default usersSlice.reducer