import axios from "axios"

const url = "http://localhost:8000"

export const loginUser = async (payload) =>{
    // console.log(payload)

    return await axios.post(`${url}/users/login`,payload)
}

export const getProfile = async (id) => {
    return await axios.get(`${url}/users/${id}`)
}

export const updateOneProfile = async(id, payload) =>{
    return await axios.put(`${url}/users/${id}`, payload)

}

export const otpSend = async (email) =>{
    return await axios.post(`${url}/users/otpsend`, {email:email})

}
export const updatePassword = async (user) =>{
    return await axios.post(`${url}/users/updatepassword`, user)

}

export const registerUser = async (user) =>{
    return await axios.post(`${url}/users/adduser`, user)

}

// for posts 

export const getAllPost = async () =>{
    return await axios.get(`${url}/posts/`)

}

export const addPost = async (payload) =>{
    // console.log(payload)
    return await axios.post(`${url}/posts/addpost`,payload)

}

export const getMyPosts = async (info) =>{
    return await axios.get(`${url}/posts/${info}`)
}


export const getOnepost = async (id) =>{
    return await axios.get(`${url}/posts/post?id=${id}`)
}

export const updatePost = async (payload) =>{
    return await axios.put(`${url}/posts/updatepost`, payload)

}

export const deleteOnePost = async (id) =>{
    return await axios.delete(`${url}/posts/delete?id=${id}`)
}