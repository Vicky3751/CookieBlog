import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    const logout = () =>{
        localStorage.removeItem("user_info")
        console.log(window.location)
        window.location.href = window.location.origin +"/"
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <img className="navbar-logo" src='../logo.png' alt='logo' />
            <NavLink className="navbar-brand" to="/global">CookieBlog</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav justify-content-end">
                <li className="nav-item mx-5">
                <NavLink className="nav-link active" aria-current="page" to="/global">Global</NavLink>
                </li>
                <li className="nav-item mx-5">
                <NavLink className="nav-link" to="/addpost">Add Post</NavLink>
                </li>
                <li className="nav-item mx-5">
                <NavLink className="nav-link" to="/myprofile">My Profile</NavLink>
                </li>
                {/* <li className="nav-item mx-5">
                <NavLink className="nav-link" to="/settings">Settings</NavLink>
                </li> */}
            </ul>
            </div>
        </div>
    </nav>
    <div className='upper-left-div row justify-content-end align-items-center align-content-center'>
        <NavLink to='/global' className='col-md-12 row justify-content-end align-items-center at-style py-3'>
            <img src="../globe.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>Global</span>
        </NavLink>
        <NavLink to='/myposts' className='col-md-12 row justify-content-end align-items-center at-style py-3' >
            <img src="../post.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>My Posts</span>
        </NavLink>
        <NavLink to='/myprofile' className='col-md-12 row justify-content-end align-items-center at-style py-3'>
            <img src="../person.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>My Profile</span>
        </NavLink>
        {/* <NavLink to='/settings' className='col-md-12 row justify-content-end align-items-center at-style py-3'>
            <img src="../settings.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>Settings</span>
        </NavLink> */}
    </div>
    <div className='lower-left-div row justify-content-center align-items-end pb-3'>
        <span className='col-md-8 copyright'>Copyrights 2022 - 2023</span>
    </div>
    <div className='lower-right-div row justify-content-center align-items-start py-5'>
        <a className='col-md-12 row justify-content-center align-items-center at-style'>
            <img src="../exit.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-3 logout' onClick={()=>logout()}>Logout</span>
        </a>
        <a className='col-md-12 row justify-content-center align-items-center at-style'>
            <img src='../logo_white.png' alt='Logo' className='right-lower-logo col-md-12'/>
            <span className='col-md-12 logo-name text-center pt-3'>Cookie Blog</span>
        </a>
        <a className='col-md-12 row justify-content-center align-items-center at-style'>
            <img src="../phone.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>9620561535</span>
        </a>
        <a className='col-md-12 row justify-content-center align-items-center at-style'>
            <img src="../fb.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>cookieblog@fb</span>
        </a>
        <a className='col-md-12 row justify-content-center align-items-center at-style'>
            <img src="../insta.png" alt='logout' className='col-md-1 nav-icon-width' />
            <span className='col-md-6 logout'>cookieblog@insta</span>
        </a>
        
    </div>
        
    {/* <div className='upper-right-div row justify-content-center align-items-center '>
        <span className='col-md-8 '>Surf Back to </span>

    </div> */}



    </>
  )
}

export default Navbar