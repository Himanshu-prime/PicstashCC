import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import convertToBase64 from "../helper/Convert";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createPost, updatePost} from "../redux/features/postSlice"

const initialState = {
  caption: "",
};

const AddEdit = () => {
  const [formValue, setformValue] = useState(initialState);
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userposts } = useSelector((state) => ({ ...state.post }));
  const id=  user?._id || user?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {postId}= useParams()

  const { caption } = formValue;

  useEffect(()=>{
    if(postId){
      const singlePost =userposts.find((post)=> post._id ===postId)
      console.log(singlePost);
      setformValue({...singlePost})
    }
  },[postId])
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption)
    formData.append("userId", id);
    formData.append("image", image)
    console.log(id)
    if(postId){
    formData.append("postId", postId)

      dispatch(updatePost({formData, navigate, toast}))
    }
    else{

      dispatch(createPost({formData, navigate, toast}))
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setformValue({ ...formValue, [name]: value });
  };
  
  
  const handleClear = () => {
    setformValue({ caption: "", description: "", tags: [] });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64)
    setImage(e.target.files[0]);
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>Add Post</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            
            <div className="col-md-12">
              <MDBInput
                label="Enter caption"
                type="text"
                value={caption}
                name="caption"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide caption"
              />
            </div>
            
            
           
            <div  style={{display:"flex", justifyContent:"center", paddingBlock:"4px"}}>
          <label htmlFor="profile">
            <img src={file || "http://www.pngall.com/wp-content/uploads/2/Upload-PNG.png"} alt="avatar" style={{objectFit:"cover",position:"relative", width:"10rem",height:"10rem", padding:"10px", border:"1.5px dashed blue"}} />
            
          </label>

          <input
            onChange={onUpload}
            type="file"
            multiple={false}
            id="profile"
            name="profile"
            style={{display:"none"}}
          />
        </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {postId ? "update" : "add"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEdit;