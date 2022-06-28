import React, { useEffect, useState ,useCallback} from 'react'
import{getProfile, updateOneProfile} from "../../services/api"
import $ from 'jquery';
import { useDropzone } from "react-dropzone";

const Myprofile = () => {


  const [profile, setProfile] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    img:"../sample.jpg"
  })
  
  useEffect(() => {
    const user_info = JSON.parse(localStorage.getItem("user_info"))

    const loadProfile = async () => {
      getProfile(user_info._id).then((response)=>{
        setProfile(response.data)
        })
    }
    loadProfile()
    console.log(profile )

  }, [])
  
  const updateProfile = (e) =>{
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    console.log(profile)
  }

  const updateProfileSubmit = async () =>{
    console.log(profile)
    updateOneProfile(profile._id,profile).then((response)=>{
      console.log(response.data)
      localStorage.setItem("user_info", JSON.stringify(response.data))
      window.location.href = window.location.origin + "/global"
    })
  }




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
          profile.img = uploadedImage
          setProfile(profile => ({
            ...profile,
            img: uploadedImage,
        }))
          $("#add-post-image").removeClass("invisible")
          $("#dragDrop").addClass("invisible")
        });
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    [images]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


const check = () =>{
  console.log(profile)
}



  return (
    <>
    <div className='row justify-content-center align-items-center section '>
      <div className='col-md-6 row justify-content-center align-items-center center-it'>
        
          {/* starts  */}
          {/* heading */}
          <div className='cookie-blog-heading-section row col-md-10  justify-content-center align-items-center py-2  mt-3'>
            <span className='cookie-blog-global-heading pb-2'>
              My Profile
            </span>
          </div>

          {/* posts  */}
          <div className='col-md-10 row pt-2 overflow-post'>
              <div className="card row py-2">
                  <div className='row col-md-12'>
                          <div className='col-md-6 row d-flex justify-content-center align-items-end cookie-blog-register-section-title'>


                          <div id="dragDrop text-center d-flex justify-content-center align-items-center"
                            style={{
                              border: "1px solid grey",
                              height: "50px",
                              fontSize: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                              minWidth: "100%",
                              width: "90%",
                              margin: "0px auto",
                              cursor: "pointer",
                              overflow:"hidden"
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p style={{ color: "grey" }}>
                                Change Image
                              </p>
                            )}
                          </div>










                          <span className='' >Name:</span>
                          <input type='text' onChange={(e)=> updateProfile(e)}   value={profile.name} name="name" className='input-style-secondary'/>
                          </div>
                          <div className='col-md-6 row'>
                            <img src={profile.img ? profile.img : "../sample.jpg"} alt=''/>
                          </div>
                          <div className='col-md-12 row d-flex justify-content-center align-items-end cookie-blog-register-section-title mt-5'>
                          <span  >Email:</span>
                          <input type='text' onChange={(e)=> updateProfile(e)}  value={profile.email} name="email" className='input-style-secondary'/>
                          </div>
                          <div className='col-md-12 row d-flex justify-content-center align-items-end cookie-blog-register-section-title mt-2'>
                          <span>Phone No:</span>
                          <input type='text' onChange={(e)=> updateProfile(e)}  value={profile.phone} name="phone" className='input-style-secondary'/>
                          </div>
                          <div className='col-md-12 row d-flex justify-content-center align-items-end cookie-blog-register-section-title mt-2'>
                          <span>Password:</span>
                          <input type='text' onChange={(e)=> updateProfile(e)}  value={profile.password} name="password" className='input-style-secondary'/>
                          </div>
                          <div className='col-md-12 row p-0 pt-2 cookie-blog-text mt-4'>
                          <span>About Me:</span>
                          </div>
                          <div className='col-md-12 row  justify-content-center align-items-center'>
                              <textarea className='input-style-secondary textarea-css' onChange={(e)=> updateProfile(e)}  value={profile.about} name="about"/>
                          </div>  
                          <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center pt-5 '>
                           <button className='btn btn-secondary login-btn ' onClick={()=>updateProfileSubmit()} >Edit</button>
                          </div>
                          {/* <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center pt-5 '>
                           <button className='btn btn-secondary login-btn ' onClick={()=>check()} >Update</button>
                          </div> */}
                          


                  </div>
              </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Myprofile