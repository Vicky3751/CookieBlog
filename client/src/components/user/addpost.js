import React, { useState, useCallback } from "react";
import { useParams } from "react-router";
import { useDropzone } from "react-dropzone";
import $ from 'jquery';
import {addPost} from "../../services/api"
const Addpost = () => {
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
          // setImages([...images, uploadedImage]);
          setImages({
            ...images,
            i_img: uploadedImage,
          });
          $("#add-post-image").removeClass("invisible")
          $("#dragDrop").addClass("invisible")
        });
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [images]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const addpostForm = (e) => {
    const user_info = JSON.parse(localStorage.getItem("user_info"))

    setImages({
      ...images,
      [e.target.name]: e.target.value,
      "p_img":user_info.img ? user_info.img : "",
      "linkId":user_info._id,
      "linkName":user_info.name
    });
    
  }

  const addpost = async () =>{

    if(!images.title || !images.i_img ){
      console.log("add the title and image")
      return 
    }
    
     await addPost(images).then((response)=>{
      window.location.href = window.location.origin + "/global" 
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
                    Add Posts
                  </span>
                </div>

                {/* posts  */}
                <div className='col-md-10 row pt-2 overflow-post'>
                    <div className="card row justify-content-center align-items-center">
                        <div className='col-md-12 row p-0 pt-2 cookie-blog-text'>
                          <span>Title:</span>
                        </div>
                        <div className='col-md-12 row  justify-content-center align-items-center'>
                            <input type='text' onChange={(e)=>addpostForm(e)}  name='title' className='input-style-secondary'/>
                        </div>
                        <div className='col-md-12 row mt-3 p-0 cookie-blog-text'>
                          <span>Image:</span>
                        </div>
                        <div className='upload-Image mt-3 p-0'>
                        <img className="add-post-image invisible" id="add-post-image" src={images.i_img}/>

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
                        <div>
                        </div>
                        <div className='col-md-12 row mt-4 justify-content-end align-items-center text-center'>
                           <button className='btn btn-secondary login-btn col-md-4' onClick={()=> addpost()} >Add Post</button>
                        </div>

                    </div>
                </div>
              </div>
          </div>
     </>
  )
}

export default Addpost