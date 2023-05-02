import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import * as api from "../api";


export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.fetchPosts();
        return response; // assuming the server returns an array of posts
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


export const createPost = createAsyncThunk("post/createpost", async ({
    formData,
    navigate,
    toast
}, {
    rejectWithValue
}) => {
    try {
        const response = await api.createPost(formData);
        toast.success("Post created Successfully!");
        navigate('/')
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const getpost = createAsyncThunk("post/getpost", async(formValue,{
    rejectWithValue
})=>{
    try {
        console.log("slice",formValue)
        const response= await api.getPost(formValue);
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})




export const getmyposts = createAsyncThunk("post/getmyposts", async ( formValue , { rejectWithValue }) => {
    try {
      const response = await api.getMyPosts(formValue);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  });

  export const deletemypost= createAsyncThunk("post/deletepost", async ({formData, toast, navigate}, {rejectWithValue, getState})=>{
    try {
        console.log(formData)
        const response = await api.deleteMyPost(formData);
      console.log(response)
      const userposts = getState().userposts;
      // Filter out the deleted post from the userposts array
      const updatedPosts = userposts.filter(
        (post) => post._id !== formData.postId
      );
      toast.success("Post deleted Successfully!")
      navigate('/')
      return updatedPosts;  //return updated posts as action.payload
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
  })

  export const updatePost = createAsyncThunk("post/updatePost", async ({
    formData,
    navigate,
    toast
}, {
    rejectWithValue
}) => {
    try {
        const response = await api.updateMyPost(formData);
        toast.success("Post updated Successfully!");
        navigate('/')
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: {},
        posts: [],
        userposts: [],
        error: "",
        loading: false
    },
    reducers:{
        setUserPosts: (state, action) => {
            state.userposts = action.payload;
            console.log("hello")
          },
    },
    extraReducers:{
        [createPost.pending]:(state,action )=>{
            state.loading= true;
        },
        [createPost.fulfilled]:(state,action )=>{
            state.loading = false;
            console.log(action.payload);
            const rawData = action.payload.post;
            const {imageURL}= action.payload;
            const post ={...rawData, imageURL: imageURL}
            state.posts.push(post);
            state.userposts.push(post)
        },
        [createPost.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },
        [fetchPosts.pending]:(state,action )=>{
            state.loading= true;
        },
        [fetchPosts.fulfilled]:(state,action )=>{
            state.loading = false;
            console.log(action.payload);
            state.posts = action.payload.posts;
        },
        [fetchPosts.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },
        [getpost.pending]:(state,action )=>{
            state.loading= true;
        },
        [getpost.fulfilled]:(state,action )=>{
            state.loading = false;
            console.log(action.payload);
            const {post}= {...action.payload}
            state.post ={...post, imageURL: action.payload.imageURL};
        },
        [getpost.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },

        [getmyposts.pending]:(state,action )=>{
            state.loading= true;
        },
        [getmyposts.fulfilled]:(state,action )=>{
            state.loading = false;
            console.log(action.payload);
            const {posts}= {...action.payload}
            console.log(posts)
            state.userposts= posts
        },
        [getmyposts.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },
        [deletemypost.pending]:(state,action )=>{
            state.loading= true;
        },
        [deletemypost.fulfilled]:(state,action )=>{
            state.loading = false;
            console.log(action.payload);
            state.userposts = action.payload;
        },
        [deletemypost.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },
        [updatePost.pending]:(state,action )=>{
            state.loading= true;
        },
        [updatePost.fulfilled]:(state,action )=>{
            state.loading = false;
            console.log(action.meta);
            
        },
        [updatePost.rejected]:(state,action )=>{
            state.loading= false;
            state.error= action.payload
            
        },
    }
})

export const {setUserPosts}= postSlice.actions 
export default postSlice.reducer;