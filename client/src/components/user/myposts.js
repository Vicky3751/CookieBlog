import { useState } from "react"
import React, {useEffect} from 'react'
import {getMyPosts} from '../../services/api'
const Myposts = () => {
  const [posts, setPost] = useState([])
  const user_info = JSON.parse(localStorage.getItem("user_info"))

  useEffect(() => {

  const getDatas = async () => {
      getMyPosts(user_info._id).then((response)=>{
        setPost(response.data)
        console.log(posts)
      })
  }
  getDatas()

  }, [])
  
  const DeletePost = (id) =>{
    console.log(id)
  
  }
  
  const UpdatePost = (id) =>{
    window.location.href = window.location.origin + "/update/"+ id
  }
  
  return (
    <>
      <div className='row justify-content-center align-items-center section '>
      <div className='col-md-6 row justify-content-center align-items-center center-it'>
        
          {/* starts  */}
          {/* heading */}
          <div className='cookie-blog-heading-section row col-md-10  justify-content-center align-items-center py-2  mt-3'>
            <span className='cookie-blog-global-heading pb-2'>
              My Posts
            </span>
          </div>

          {/* posts  */}
          <div className='col-md-10 row pt-2 overflow-post'>
            

            {/* post  */}
            {
              posts.length === 0 ?
              <div className="row col-md-12  justify-content-center align-items-center">
                <span className="cookie-blog-global-heading">No Posts Yet</span>
              </div>:
                <div></div>
            }

            {posts.map((post,i) =>{ 
              return (

              <div className="card row justify-content-center align-items-center my-2" id={post._id} key={i}>
                <div className='col-md-12 row py-3'>
                  <img className='post-heading-image col-md-3 p-0 ms-2' src={post.p_img ? post.p_img : "../sample.jpg"} alt=''/>
                  <div className='col-md-9 mx-3'>
                  <h5 className="card-title ">{post.linkName
                  }</h5>
                  <h6 className="card-subtitle mb-2 text-muted ">{Math.ceil((new Date() -new Date(post.createdAt) ) / (1000 * 3600 * 24))} day ago</h6>
                  </div>
                  <div className='col-md-1 d-flex p-0  justify-content-center align-items-center'>
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
                    </ul>
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

              





          </div>








      </div>
    </div>
    </>
  )
}

export default Myposts