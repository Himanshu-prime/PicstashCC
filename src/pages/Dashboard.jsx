import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from 'mdb-react-ui-kit';
import loader from '../Assets/loader.gif'
import { getmyposts,deletemypost } from '../redux/features/postSlice';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const {userposts, loading, error} = useSelector((state)=>({...state.post}))
  const {user} = useSelector((state)=> ({...state.auth}))
  const [formValue, setFormValue]= useState({userId: user?.id})
  const [userPosts, setUserPosts]= useState(userposts)
 const navigate= useNavigate()
  const dispatch= useDispatch()


  useEffect(() => {
    if (user) {
      console.log(formValue);
      dispatch(getmyposts(formValue));
    }
  }, [ user,formValue, dispatch]);
  

const handleDelete =async (postId)=>{
  if (window.confirm("Do you really want to delete this post?")){
//     fetch('https://picstash.vercel.app/api/v1/posts/deletePost/', {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     userId: user?.id,
//     postId: postId
//   })
// })
// .then(response => {
//   if (response.ok) {
//     const postsResponse = await fetch('https://picstash.vercel.app/api/v1/posts/userPosts/' + user?.id);
//     toast.success("Post deleted Successfully!")
//     navigate('/')
//     dispatch(getmyposts(formValue))
//   } else {
//     toast.error('Error deleting post');
//   }
// })
// .catch(error => {
//   toast.error('Error deleting post:', error);
// });


try {
  const response = await fetch('https://picstash.vercel.app/api/v1/posts/deletePost/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: user?.id,
      postId: postId
    })
  });
  
  if (response.ok) {
    // refetch the posts data after successful delete
    const postsResponse = await fetch('https://picstash.vercel.app/api/v1/posts/myPosts/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user?.id,
      })
    }
      );
    const postsData = await postsResponse.json();
    console.log(postsData)
    setUserPosts(postsData);
    
    toast.success("Post deleted Successfully!")
    navigate('/');
  } else {
    toast.error('Error deleting post');
  }
} catch (error) {
  console.error('Error deleting post:', error);
}
  }

}
if(loading){
  return  (

    <img src={loader} alt='loader' style={{width:"5rem", height:"5rem", margin:"auto", display:"block", marginTop:"10rem"}}/>
  )
}  

  return (

    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "100%",
        height:"100vh",
        alignContent: "center",
        backgroundColor:"white"
      }}
    >
      {userPosts.length === 0 && (
        <h3 style={{color:"black", textAlign:"center"}}>No posts available from you {user?.name}</h3>
      )}

      {userPosts.length > 0 && (
        <>
          <h5 className="text-center" style={{color:"black"}}>User: {user?.name}</h5>
        </>
      )}

      {userPosts &&
        userPosts.map((item) => 
        {const {caption , _id,imageURL} = item;
          return (
          <MDBCardGroup key={_id}>
            <MDBCard style={{ maxWidth: "600px",margin:"auto", padding:"6px", boxShadow:"1.5px 1.5px 4px 0.2px grey" }} className="mt-4">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={imageURL}
                    alt={item.caption}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start" style={{color:"black"}}>
                      caption:- {caption}
                    </MDBCardTitle>
                    
                    
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-50px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(_id)}
                        />
                      </MDBBtn>
                      <Link to={`/editImage/${_id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#ffe854f0", marginLeft: "10px" }}
                          size="lg"
                          
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>

        )
                    })}
    </div>
  )
}

export default Dashboard


