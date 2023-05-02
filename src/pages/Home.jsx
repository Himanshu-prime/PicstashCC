import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/features/postSlice';
import { Link } from 'react-router-dom';import Footer from "../components/Footer";
import loader from '../Assets/loader.gif'

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,MDBCardFooter
} from 'mdb-react-ui-kit';
const Home = () => {
  const dispatch = useDispatch();
  const {posts,loading} = useSelector((state) => ({ ...state.post }));
  

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

    if(loading){
      return  (

        <img src={loader} alt='loader' style={{width:"5rem", height:"5rem", margin:"auto", display:"block", marginTop:"10rem"}}/>
      )
    }
  return (

    <>
    <div
   className='container' style={{paddingTop:"3rem", display:"flex",padding:"2rem", justifyContent:"center", alignItems:"center"}}
  >
    <MDBRow className='row-cols-1 row-cols-md-3 g-3 mt-5' >
      {posts.map((post) => 
      (
        
        <MDBCol key={post._id}>
          <MDBCard style={{width:"22rem", height:"18rem", boxShadow:"3px 4px 8px 3px gray",margin:"8px" }}>
            <MDBCardImage src={post.imageURL} alt={post.title} position='top' style={{objectFit:"cover", height:"55%"}}/>
            <MDBCardBody>
              <MDBCardTitle>{post.userId}</MDBCardTitle>
              <MDBCardText>{post.caption}</MDBCardText>
            </MDBCardBody>
            <MDBCardFooter style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px"}}>
          <small className='text-muted' style={{display:"block"}}>{post.createdAt}</small>
          <button style={{display:"block", border:"none", backgroundColor:"blue", padding:"4px 10px", borderRadius:"10px" }}><Link style={{ color:"white",letterSpacing:"1px",textDecoration:"none"}} to={`/posts/${post._id}`}>View</Link></button>
        </MDBCardFooter>
          </MDBCard>
        </MDBCol>
          
        
      ))}
    </MDBRow>
    
  </div>
  <Footer/>
    </>
    
  )
}

export default Home