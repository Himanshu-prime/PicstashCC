import axios from 'axios'

const API = axios.create({baseURL:"https://picstash.vercel.app"});


export const signUp = async (formData) => {
    try {
      const response = await API.post("/api/v1/users/signup", formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  };

  export const signIn = async (formData) => {
    try {
      const response = await API.post("/api/v1/users/login", formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  };



  export const createPost = async(formData)=>{
    try {
      const response = await API.post("/api/v1/posts/createPost/", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data
    } catch (error) {
      console.log(error);
    throw new Error(error.response.data.error);
    }
  }

  export const fetchPosts = async()=>{
    try {
      const response = await API.get("/api/v1/posts/getAllPosts/");
      return response.data
    } catch (error) {
      console.log(error);
    throw new Error(error.response.data.error);
    }
  }

  export const getPost = async(formData)=>{
    console.log(formData)
    try {
      const response= await API.post("/api/v1/posts/getPost/",formData)
      return response.data
    } catch (error) {
      console.log(error);
    throw new Error(error.response.data.error);
    }
  }

  export const getMyPosts = async (data) => {
    try {
      console.log(data);
      const response = await API.post(`/api/v1/posts/myPosts/`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  };

  export const deleteMyPost = async (formValue) => {
    try {
      console.log(formValue);
      const response = await API.delete(`/api/v1/posts/deletePost/`, formValue);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  };

  export const updateMyPost = async(formData)=>{
    try {
      const response = await API.patch("/api/v1/posts/updatePost/", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data
    } catch (error) {
      console.log(error);
    throw new Error(error.response.data.error);
    }
  }