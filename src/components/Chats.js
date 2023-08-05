
import React,{useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ChatEngine } from 'react-chat-engine';
import {auth} from './Firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
const Chats = () =>{
    const history = useHistory();
    const {user} = useAuth();
    const [loading , setLoading]= useState(true);
   
    const handleLogout = async () =>{
    await auth.signOut();
    history.push('/');

    }
    const getFile = async (url) =>{
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data] , "userPhoto.jpg" ,{type: 'image/jpeg'} )
    }
    useEffect(()=>{
       if(!user){
        history.push('/');
        return;

       }
       axios.get('https://api.chatengine.io/users/me',{
        headers:{
          "project-id" : "501e4a11-65a1-4c54-b9d4-070b868fb7ef",
          "user-name": user.email,
          "user-secret" : user.uid,
        }

       })
      .then(()=>{
        setLoading(false);
      }) 
      .catch(() =>{
        let formdata = new FormData();
        formdata.append('email' , user.email);
        formdata.append('username' , user.email);
        formdata.append('secret' , user.uid);
        getFile(user.photoURL)
        .then((avatar) =>{
          formdata.append('avatar', avatar , avatar.name );
          axios.post('https://api.chatengine.io/users',
          formdata,
          {headers:{ "private-key": "8147fe02-b4e9-4db8-a82f-7b30c73fd668"}}
          )
          .then(()=> setLoading(false))
          .catch((error) => console.log(error))
        })
      })
    }, [user,history]);
    if(!user || loading) return 'Loading ...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
              <div className="logo-tab" >
               Unichat 
              </div> 
              <div onClick={handleLogout} className="logout-tab">
                Logout
              </div>
            </div>
            <ChatEngine
                 height="calc(100vh -66px)"
                 projectID="501e4a11-65a1-4c54-b9d4-070b868fb7ef"

                 userName={user.email}
                 userSecret={user.uid}


            />
        </div>
    )
}
export default Chats;