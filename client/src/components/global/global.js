import axios from 'axios';
import React ,{useEffect, useState,useRef, useCallback} from 'react'
import {getAllPost, deleteOnePost} from '../../services/api'
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

const Global = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"))
  const DeletePost = (id) =>{
    // console.log(id)
    deleteOnePost(id).then((response)=>{
      getPosts()
      window.location.href = window.location.origin + "/global"
    })
  
  }
  
  const UpdatePost = (id) =>{
    window.location.href = window.location.origin + "/update/"+ id
  }
  const [posts, setPosts] = useState([])

    const [hasMore, sethasMore] = useState(true);

    const [page, setpage] = useState(1);
    const getPosts =async () =>{
        const res = await axios.get(`http://localhost:8000/posts?page=${0}&limit=${2}`)
        const data = await res.data
        setPosts(data)
    }
    useEffect(()=>{

        getPosts()  

    },[])

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:8000/posts?page=${page}&limit=${2}`)

        const data = await res.data;
        return data;
      };


    const fetchData = async() =>{
        const commentsFormServer = await fetchComments();

        setPosts([...posts, ...commentsFormServer]);
        if (commentsFormServer.length === 0 || commentsFormServer.length < 2) {
          sethasMore(false);
        }
        setpage(page + 1);
    }




  return (
    <>
    <div className='row justify-content-center align-items-center section ' >
      <div className='col-md-6 row justify-content-center align-items-center center-it'>
        
          {/* starts  */}
          {/* heading */}
          <div className='cookie-blog-heading-section row col-md-10  justify-content-center align-items-center py-2  mt-3'>
            <span className='cookie-blog-global-heading pb-2'>
              Global Posts
            </span>
          </div>

          {/* posts  */}
          <div className='col-md-10 row pt-2 overflow-post' id="scrollableDiv">
            
          <InfiniteScroll
        dataLength={posts.length} 
        next={fetchData}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        >        
            {/* post  */} 
            {posts.map((post,i) =>{ 
              return (

              <div className="card row justify-content-center align-items-center my-2" id={post._id} key={i}>
                <div className='col-md-12 row py-3'>
                  <img className='post-heading-image col-md-3 p-0 ms-2' src={post.p_img ? post.p_img : "../sample.jpg"} alt=''/>
                  <div className='col-md-9 mx-3'>
                  <h5 className="card-title ">
                    <Link className='name-link' to={`/profile/${post.linkId}`} >
                    {post.linkName}
                    </Link>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted ">{Math.ceil((new Date() -new Date(post.updatedAt) ) / (1000 * 3600 * 24))} day ago</h6>
                  </div>
                  <div className='col-md-1 d-flex p-0  justify-content-center align-items-center'>
                    {
                      user_info._id === post.linkId ? 
                  <ul id="ul-element">
                      <li className="nav-item dropdown" >
                          <a className="nav-link dropdown " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <img className='threedot' src='./threedots.png' alt="click for more options"/>
                          </a>
                          <ul className="dropdown-menu multi-level row ab" aria-labelledby="navbarDropdown" style={{cursor:"pointer"}}>
                            <li >
                              <a className="dropdown-item" style={{cursor:"pointer"}} onClick={()=> UpdatePost(post._id)} >Update</a>
                              <a className="dropdown-item" style={{cursor:"pointer"}} onClick={()=> DeletePost(post._id)} >Delete</a>
                            </li>
                          </ul>
                      </li>
                  </ul> : <div></div>
            }
                  </div>
                </div>
                <div className="card-body row justify-content-center align-items-center ">
                  <p className="card-text">{post.title.substr(0,100)}</p>
                  <div className='col-md-12 justify-content-center align-items-center d-flex border p-0' style={{'borderRadius':'12px'}}>
                  <img className="post-main-image" src={post.i_img ? post.i_img :'./imagepost.png'}/>
                  </div>
                </div>
                <div className='lss-buttons col-md-12 row justify-content-between align-items-center pb-3'>
                  <div className='col-md-4 d-flex justify-content-center align-items-center'>
                      <img src='./like.png' alt='Like'/>
                  </div>
                  <div className='col-md-4 d-flex justify-content-center align-items-center'>
                      <img src='./comment.png' alt='Like'/>
                  </div>
                  <div className='col-md-4 d-flex justify-content-center align-items-center'>
                      <img src='./save.png' alt='Like'/>
                  </div>

                </div>
                
              </div>
              )
            })}


         </InfiniteScroll>




          </div>








      </div>
    </div>
    </>
  )
}

export default Global