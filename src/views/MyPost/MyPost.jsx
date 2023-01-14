import axios from 'axios';
import React,{useEffect,useState} from 'react'
import styles from './MyPost.module.css'
import Post from './Post';
// import { useHistory } from 'react-router-dom';

const MyMeetings = ({room}) => {
  const JWTtoken = window.localStorage.getItem("JWTtoken");
//   const config = {
//   headers:{
//     Authorization: `Bearer ${JWTtoken}`,
//   }
// };
const [posts,setPosts]=useState([]);
useEffect(()=>{
  myPosts()
})
async function myPosts(){
  try{
    const data = await axios.get("http://localhost:5000/myposts")
    // console.log(data)
    setPosts(posts.data)
  }
  catch(error){
    console.log(error)
  }
}
  // const JWTtoken = window.localStorage.getItem("JWTtoken");
  // const config = {
  //   headers:{
  //     Authorization: `Bearer ${JWTtoken}`,
  //   }
  // };
  // const url = "http://localhost:5000/myposts";
  // axios.get(url, config)
  
  // .then(res=> console.log(res),setpost(res))
  // .catch(err=> console.log(err))
  //  console.log(res)
  return (
    <div className={styles.roomList}>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>

  )
}

export default MyMeetings