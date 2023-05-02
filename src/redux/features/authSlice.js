import {
    createSlice,
    createAsyncThunk
  } from "@reduxjs/toolkit";
  import * as api from "../api";

  import { setUserPosts } from "./postSlice";
  
  export const register = createAsyncThunk("auth/register", async({formValue,navigate, toast },{rejectWithValue})=>{
    try {
        const response = await api.signUp(formValue);
        toast.success("Registered Successfully")
        navigate('/')
        
        console.log(response)

        return response
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
  });

  export const login = createAsyncThunk(
    "auth/login",
    async ({
      formValue,
      navigate,
      toast
    }, {
      rejectWithValue
    }) => {
      try {
        const response = await api.signIn(formValue);
        toast.success("Login Successfully");
        navigate("/");
        console.log(response)
        
        return response;
      } catch (err) {
        return console.log(err.response.data)
      }
    }
  );


  const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      error: "",
      loading: false,
    },
    reducers:{
      setUser: (state, action) => {
        
        state.user= action.payload
      },
      setLogout: (state, action) => {
        localStorage.clear();
        state.user = null;
      },
    },
    extraReducers: {
        [register.pending]:(state,action )=>{
            state.loading= true;
        },
        [register.fulfilled]:(state,action )=>{
          state.loading = false;
          const { user } = action.payload;
          state.user = user;
          console.log(user)
          localStorage.setItem("profile", JSON.stringify( user ));
          setUserPosts(state.user.posts)
        },
        [register.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },
        [login.pending]:(state,action )=>{
            state.loading= true;
        },
        [login.fulfilled]:(state,action )=>{
            state.loading= false;
            const {user}= action.payload
            state.user= user
            localStorage.setItem("profile", JSON.stringify(user))
            setUserPosts(state.user.posts)
        },
        [login.rejected]:(state,action )=>{
            state.loading= false;
            
        },
    
    }
  });
  
  
  export const { setUser, setLogout, setToken } = authSlice.actions;
  export default authSlice.reducer;