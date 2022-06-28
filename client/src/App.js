import './App.css';
import LoginRegister from "./components/auth/loginRegister"
import Navbar from './components/common/Navbar';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import  Global  from "./components/global/global"
import  Globals  from "./components/global/globals"
import  Yourprofile  from "./components/global/yourprofile"
import  Addpost  from "./components/user/addpost"
import  Myposts from "./components/user/myposts"
import  Myprofile  from "./components/user/myprofile"
import  Updatepost  from "./components/user/updatepost"
import  Mysettings  from "./components/user/mysettings"
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { useState , useEffect} from 'react';
function App() {
  const [path , setpath] = useState('')
  const [Logged , setLogged] = useState(false)
  const user_info = JSON.parse(localStorage.getItem("user_info"))
  useEffect(() => {
    setpath(window.location.pathname)
    if(user_info){
      setLogged(true)
    }
  }, [path])
  
  return (
    <div className="App">
      <BrowserRouter>
        {path !="/" && path != "/login" && <Navbar/>} 
        <Routes>
          <Route exact path="/" element={<LoginRegister/>} />
          <Route exact path="/login" element={<LoginRegister />} />

          <Route exact path="/global" element={<Global/>} />
          <Route exact path="/profile/:id" element={<Yourprofile />} />


          <Route exact path="/myprofile" element={<Myprofile />} />
          <Route exact path="/addpost" element={<Addpost />} />
          <Route exact path="/myposts" element={<Myposts />} />

          <Route exact path="/settings" element={<Mysettings />} />
          <Route exact path="/update/:id" element={<Updatepost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
