import axios from 'axios'
import React, {useEffect, useState} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
const Globals = () => {
    
    const [posts, setPosts] = useState([])

    const [hasMore, sethasMore] = useState(true);

    const [page, setpage] = useState(1);
    useEffect(()=>{
        const getPosts =async () =>{
            const res = await axios.get(`http://localhost:8000/posts/${0}/${2}`)
            const data = await res.data
            setPosts(data)
        }
        getPosts()  

    },[])

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:8000/posts/${page}/${2}`)

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
    <div className='row justify-content-center align-items-center'>
        <div className='col-md-6 row'>
        <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
    >        
        {posts.map((post,i)=>{
            return(

            <div className='card'style={{'minHeight':'100vh'}} key={i}>
                <span className='card-tittle'>{post.title}</span>
            </div>

            )
        })
        }


         </InfiniteScroll>
            
        </div>
    </div>
  )
}

export default Globals