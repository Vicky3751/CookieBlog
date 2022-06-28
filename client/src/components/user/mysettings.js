import React from 'react'

const Mysettings = () => {
  return (
    <>
          <div className='row justify-content-center align-items-center section '>
            <div className='col-md-6 row justify-content-center align-items-center center-it'>
              
                {/* starts  */}
                {/* heading */}
                <div className='cookie-blog-heading-section row col-md-10  justify-content-center align-items-center py-2  mt-3'>
                  <span className='cookie-blog-global-heading pb-2'>
                    My settings
                  </span>
                </div>

                {/* posts  */}
                <div className='col-md-10 row pt-2 overflow-post'>
                    <div className="card row justify-content-center align-items-center">
                        <div className='col-md-12 row p-0 pt-2 cookie-blog-text'>
                          <span>Theme:</span>
                        </div>
                        <div className='col-md-12 row  justify-content-center align-items-center'>
                            <input type='text'   name='email' className='input-style-secondary'/>
                        </div>
                        {/* <div className='col-md-12 row mt-3 p-0 cookie-blog-text'>
                          <span>Post visible to:</span>
                        </div>
                        <div className='col-md-12 row  justify-content-center align-items-center'>
                          <select>
                            <option value="fruit">Everybody</option>
                            <option value="vegetable">Freinds</option>
                            <option value="meat">Meat</option>
                          </select>
                        </div> */}
                        <div className='col-md-12 row p-0 pt-2 cookie-blog-text mt-4'>
                          <span>About Me:</span>
                        </div>
                        <div className='col-md-12 row  justify-content-center align-items-center'>
                            <textarea className='input-style-secondary textarea-css'/>
                        </div>  
                        <div className='col-md-12 row mt-4 justify-content-end align-items-center text-center'>
                           <button className='btn btn-secondary login-btn col-md-4' >Add Post</button>
                        </div>

                    </div>
                </div>
              </div>
          </div>
          </>
  )
}

export default Mysettings