import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {isAuthAdmin: !! localStorage.getItem('toke_admin')};
const loginAdmin= createAsyncThunk('auth/loginAdmin',async(payload)=>{
    try{
        const getApi = await axios.post ('https://bootcamp-rent-cars.herokuapp.com/admin/auth/login',payload); 

        return getApi.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
});

const authAdminSlice= createSlice({
    name:"authAdminLogin",
    initialState,
    reducers:{
        login(state,action){
            state.isAuthAdmin = action.payload;

        },
        logout (state,action){
            localStorage.removeItem('toke_admin');
            localStorage.removeItem('role');
            state.isAuthAdmin = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginAdmin.fulfilled,(state,action)=>{
            localStorage.setItem('toke_admin', action.payload.access_token);
            localStorage.setItem('role', action.payload.role);
            authAdminSlice.caseReducers.login(state,{
                payload: !! action.payload,
                type: loginAdmin.typePrefix
            });
        });
        builder.addCase(loginAdmin.rejected,(state,action)=>{
            authAdminSlice.caseReducers.login(state,{
                payload: false,
                type: loginAdmin.typePrefix
            });
        });
    }
});

export const {login,logout} = authAdminSlice.actions;
export {loginAdmin};
export default authAdminSlice;