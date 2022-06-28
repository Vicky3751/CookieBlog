import React, {useCallback, useState, useEffect} from 'react'
import { useDropzone } from "react-dropzone";
import $, { post } from 'jquery';
import { useParams } from "react-router-dom";
import {getOnepost, updatePost} from "../../services/api"
const Updatepost = () => {
  const {id} = useParams()
  const [images, setImages] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles[0].name);
      var reader = new FileReader();
      let uploadedImage = "";
      const checkPDF = acceptedFiles[0].name.substring(
        acceptedFiles[0].name.length - 4,
        acceptedFiles[0].name.length
      );
      // console.log(checkPDF);
      if (checkPDF !== ".pdf") {
        reader.addEventListener("load", function (e) {
          uploadedImage = reader.result;
          console.log(reader)
          setImages({
            ...images,
            i_img: uploadedImage,
          });
          setPost(post => ({
            ...post,
            i_img: uploadedImage,
        }))

        });
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [images]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const [post, setPost] = useState({})

    useEffect(() => {
      const getpost =async () =>{
        console.log("first", id)
        await getOnepost(id).then((response)=>{
          console.log(response.data)
          setPost(response.data)
        })
      }
      getpost()
    }, [])

    const UpdatePostForm = (e) =>{
      setPost({
        ...post,
        [e.target.name]: e.target.value
      })
    }
    
    const updatePostSumbit = () =>{
      console.log(post)
      updatePost(post).then((response)=>{
        // console.log("first")
        window.location.href = window.location.origin +"/global"
      })
    }

  return (
    <>
          <div className='row justify-content-center align-items-center section '>
            <div className='col-md-6 row justify-content-center align-items-center center-it'>
              
                {/* starts  */}
                {/* heading */}
                <div className='cookie-blog-heading-section row col-md-10  justify-content-center align-items-center py-2  mt-3'>
                  <span className='cookie-blog-global-heading pb-2'>
                    Update Post
                  </span>
                </div>

                {/* posts  */}
                <div className='col-md-10 row pt-2 overflow-post'>
                    <div className="card row justify-content-center align-items-center">
                        <div className='col-md-12 row p-0 pt-2 cookie-blog-text'>
                          <span>Title:</span>
                        </div>
                        <div className='col-md-12 row  justify-content-center align-items-center'>
                            <input type='text' onChange={(e)=>UpdatePostForm(e)} value={post.title}  name='title' className='input-style-secondary'/>
                        </div>
                        <div className='col-md-12 row mt-3 p-0 cookie-blog-text'>
                          <span>Image:</span>
                        </div>
                        <div className='upload-Image mt-3 p-0'>
                            <img className="add-post-image p-0 border-radius" id="add-post-image" src={post.i_img}/>
                            <div id="dragDrop"
                            style={{
                              border: "3px dotted grey",
                              height: "200px",
                              fontSize: "18px",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                              minWidth: "100%",
                              width: "90%",
                              margin: "50px auto",
                              cursor: "pointer"
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p style={{ color: "grey" }}>
                                Drag 'n' drop an Image here, or click to select Image
                              </p>
                            )}
                          </div>
                        </div>
                        <div className='col-md-12 row mt-4 justify-content-end align-items-center text-center'>
                           <button className='btn btn-secondary login-btn col-md-4' onClick={()=>updatePostSumbit()}>Update Post</button>
                        </div>

                    </div>
                </div>
              </div>
          </div>
    </>
  )
}

export default Updatepost