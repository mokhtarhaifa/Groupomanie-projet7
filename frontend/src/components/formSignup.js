import axios from 'axios'
import React,{useState} from 'react'
import '../styles/Login.css'
import { Link,useNavigate } from "react-router-dom";

const FormSignup = () => {
    let navigate = useNavigate();

    const [user, setUser]=useState({
        firstName:"",
        lastName:"",
        email: "",
        password: ""
    })

    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    const [errormail, setErrormail]= useState("")
    const [errorpass, setErrorpass]= useState("")


    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const regexPassword =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ /* minimum 8 carractéres avec au moins un chiffre et une lettre en majiscule et un carrctére sepacial*/
    let statusmail = false;
    let statuspass = false;

    // Gestion de cahngement des inputs
    const handelChange = event =>{
        // recuèpérer le value du champ
        const value = event.currentTarget.value;
        // recuperer le nom du champ changé
        const name = event.currentTarget.name;
        // recuperer le valeur et le champs changé en passant une variable avec le nom du champs changé
        setUser({...user, [name]:value})
    }

    // Gestion d'enrejistrement de formulaire
    const handelSubmit = async event =>{
        event.preventDefault();
        
        // verification d'email et password
        if(regexEmail.test(user.email)){
            statusmail=true;
        }
        else{
            setErrormail("email incorrecte")
         };
        if((regexPassword.test(user.password))){
            statuspass=true;
        }
        else{
            setErrorpass("pass incorrecte")
            console.log(user.password)
        };

        if(statusmail && statuspass === true ){
                    
            try{
                const response = await axios.post("http://localhost:3001/auth/signup", user)
                console.log(response)
            }
            catch (error){
                console.log(error.res)
            }
                console.log(user);

            navigate('/login');

        }
    }
    

return (
<div id="LoginForm" className="container-fluid">
<div className="row">
        <div className="col d-none d-md-block">
			    </div>
    <div className='col col-md-12 col-lg-4'>
    <div className="login-form">
        <div className="main-div">
            <div className="panel">
                <h1>Plateforme Groupomania</h1>
                <h2>Inscrivez-vous</h2>
            </div>
            <form id="Signup" onSubmit={handelSubmit}>
                <div className="form-group">

                    <input type="text" className="form-control"  id="firstName" name="firstName" placeholder="Prénom"  onChange={handelChange} required />

                </div>

                <div className="form-group">

                    <input type="text" className="form-control"  id="lastName" name="lastName" placeholder="Nom"  onChange={handelChange}  required/>
                    
                </div>

                <div className="form-group">

                    <input type="email" className={"form-control" +(errormail && " is-invalid")}  ref={emailRef}  id="inputEmail" name="email" placeholder="Email"  onChange={handelChange}  required/>
                    {errormail &&<p className='invalid-feedback'> {errormail} </p>}
                </div>

                <div className="form-group">

                    <input type="password" className={"form-control" +(errorpass && " is-invalid")} ref={passwordRef} id="inputPassword" name="password" placeholder="Mot de passe"  value={user.password} onChange={handelChange} autoComplete="off" required/>
                    {errorpass &&<p className='invalid-feedback'> {errorpass} </p>}
                </div>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
                <Link className="linkt" to ={
                            "/Login"
                }> 
                J'ai déja un compte </Link>
            </form>
        </div>
    </div>
    </div>
    <div className="col-4 d-none d-md-block">
			    </div>
    </div>
</div>	

  )
}

export default FormSignup
