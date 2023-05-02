import {React, useEffect, useState} from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getpost } from '../redux/features/postSlice';
import loader from '../Assets/loader.gif'


const SingleImage = () => {
  const {_id} = useParams();
  const [formValue, setFormValue]= useState({ postId: _id });
  const dispatch= useDispatch();
  const {post, loading, error}= useSelector((state)=> ({...state.post}))
  const navigate= useNavigate()
  
  useEffect(() => {
    if (formValue.postId) {
      console.log("hello");
      console.log("frontend",formValue.postId);
      dispatch(getpost(formValue));
    }
  }, [formValue, dispatch]);

  if(loading){
    return  (
  
      <img src={loader} alt='loader' style={{width:"5rem", height:"5rem", margin:"auto", display:"block", marginTop:"10rem"}}/>
    )
  }  
  return (
    // <div className='container pt-5'>
    // <MDBCard className='mb-3' style={{display:"block", margin:"auto", width:"60rem"}}>
    //     <MDBCardImage position='top' src={post.imageURL} alt='...' style={{height:"30rem"}}/>
    //     <MDBCardBody>
    //       <MDBCardTitle>Created By:- {post.userId}</MDBCardTitle>
    //       <MDBCardText>
    //         caption:- {post.caption}
    //       </MDBCardText>
    //       <MDBCardText>
    //         <small className='text-muted'>{post.createdAt}</small>
    //       </MDBCardText>
    //     </MDBCardBody>
    //   </MDBCard>
    //   </div>
<div className='container pt-5' style={{marginTop:"4rem"}}>
    <MDBContainer>
        <MDBCard className="mb-3 mt-10">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={post.imageURL}
            alt={post.caption}
          />
          <MDBCardBody>
            
            <h3>{post.caption}</h3>
            <span>
              <p className="text-start tourName">Created By: {post._id}</p>
            </span>
            
            <br />
          
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      </div>
  )
}

export default SingleImage