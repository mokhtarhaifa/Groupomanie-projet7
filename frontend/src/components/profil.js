import React,{ useEffect, useRef, useState } from 'react'
import axios from 'axios'
import '../styles/profil.css'
import { useNavigate } from "react-router-dom";




const Profil = () => {
    
    let navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('userId'));
    const token = localStorage.getItem('Token');
    const [userData, setUserData] = useState(''); 

    const [email, setemail] = useState(''); 
    const [firstName, setfirstName] = useState(''); 
    const [lastName, setlastName] = useState(''); 
    const [imgUrl, setimgUrl] = useState(null); 
    const [error, setError] = useState(); 
    
    const firsNRef = React.useRef();
    const lastNRef = React.useRef();
    const emailRef = React.useRef();
    const imgRef = React.useRef();
    const imgUrlRef = React.useRef();
    
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let status = false;

    // Affichage des informations
    const updatepage=() =>{axios.get("http://localhost:3001/user/" + userId )
    .then(response => 
        setUserData(response.data)
    
    )
    .catch(error => console.log(error.response))}
    useEffect(() => {
        {updatepage()}
        
    },[])
    

    const getpubEdit = () => {
        axios.get("http://localhost:3001/user/" +userId)
        .then(response => {
            firsNRef.current.value=response.data.firstName;
            lastNRef.current.value=response.data.lastName;
            emailRef.current.value=response.data.email;
            imgRef.current.src=response.data.imgUrl;
            imgUrlRef.current.value=response.data.imgUrl;
        })
        .catch(error => console.log(error.response))
    }

    // modifier profil
    const updateProfil = () => {

        const formDataedit = new FormData();
        formDataedit.append('firstName', firsNRef.current.value);
        formDataedit.append('lastName', lastNRef.current.value);
        formDataedit.append('email', emailRef.current.value);
        formDataedit.append('image', imgUrl);

        let pro={
            "firstName":firsNRef.current.value,
            "lastName":lastNRef.current.value,
            "email":emailRef.current.value,
            "imgPath":imgUrlRef.current.value,
        }
        if(regexEmail.test(email)){
            axios
                .put("http://localhost:3001/user/"+userId, imgUrl !=null ? formDataedit : pro )
                .then(res => {
                    setError("");
                    updatepage();
                    console.log(res);
             
             })
            .catch(error => {
            console.log(error);
            })
            status=true;
        }
        else{
            setError("email incorrecte")
        }
            
            
        

    }
    
    // delete profil
     const deleteProfile = () => {
        axios
        .delete("http://localhost:3001/user/"+userId)
        .then(response => {
            localStorage.clear();
            navigate("/")
        })
        .catch(error => {
            console.log(error.response);
        })
        
    }   

    return (
        <div className="container emp-profile">
                    <form >
                        <div className="row">
                            <div className="col-md-3 col-xs-12">
                                <div className="profile-img">
                                {userData.imgUrl ? (
                                                <img src={userData.imgUrl} className="img-responsive"  alt="test2"/>
                                            ):
                                            (<img src="https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg"className="img-responsive"  alt="test2"/>)
                                            }
                                    
                                </div>
                            </div>
                             
                            <div className="col col-md-6 col-xs-12 center">
                                <div className="profile-head">
                                        <h2> &Agrave; propos</h2>
                                        <h5> {userData.firstName} {userData.lastName}</h5>
                                        <h6>{userData.email}</h6>
                                </div>
                            </div>
                            
                            <div className="col-md-3 col-xs-12 center">
                                <input type="submit" className="profile-edit-btn" name="btnAddMore"data-bs-toggle="modal" data-bs-target="#exampleModal" value="Edit Profile" onClick={()=> getpubEdit()}/>
                                {userId==28?(<></>):(
                                    <input type="submit" className="profile-edit-btn blockDelete" value="delete Profile" onClick={() => deleteProfile()} />)}
                            </div>
                            
                        </div>
                        
                    </form>    
                    {/* // modal de modification de publication */}

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit posts</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                </div>
                                <input type="hidden" ></input>
                                <input type="text" ref={imgUrlRef}></input>
                                <div className="modal-body">
                                    <input type="text" ref={firsNRef} onChange={(e) => setfirstName(e.target.value)}/>
                                    <input  type="text" ref={lastNRef} onChange={(e) => setlastName(e.target.value)}/>
                                    <input  type="text" ref={emailRef} onChange={(e) => setemail(e.target.value)}/>
                                    <input type="file" className= {error && " is-invalid"} onChange={(e) => setimgUrl(e.target.files[0])} />
                                    {error &&<p className='invalid-feedback'> {error} </p>}
                                    <img src='' ref={imgRef} className="img-responsive imgPublication"/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {status ==true ?(<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updateProfil()}>Save changes</button>):(<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updateProfil()}>Save changes</button>) }
                                    
                                </div>
                            </div>
                        </div>
                    </div>       
        </div>
    )}
  
  export default Profil