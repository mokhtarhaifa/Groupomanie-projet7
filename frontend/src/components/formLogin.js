import axios from 'axios'
import React,{useState} from 'react'
import '../styles/Login.css'
import {useNavigate,Link} from 'react-router-dom';

const FormLogin = () => {

    const [credentials, setCredentials]=useState({
        email:"",
        password:""
    })

const [error, setError]= useState("")

// Gestion de cahngement des inputs
const handelChange = event =>{
    // recuèpérer le value du champ
    const value = event.currentTarget.value;
    // recuperer le nom du champ changé
    const name = event.currentTarget.name;
    // recuperer le valeur et le champs changé en passant une variable avec le nom du champs changé
    setCredentials({...credentials, [name]:value})
}
let navigate = useNavigate();
// Gestion d'enrejistrement de formulaire
const handelSubmit = async event =>{
    event.preventDefault();

    try{
        const token = await axios.post("http://localhost:3001/auth/login", credentials)
        // stocker le token en navigateur
            .then(res => [localStorage.setItem("token", res.data.token), localStorage.setItem("userId", res.data.userId)])
            
        // implementer le header par defaut pour toute requette avec le méme token 
            axios.defaults.headers["Authorization"] = "Bearer" + token;
            navigate('/homePage');
            
    }
    catch (error){
        console.log(error.res)
        setError("email incorrecte")
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
                <h2>Connectez-vous</h2>
            </div>
            <form id="Login" onSubmit={handelSubmit}>

                <div className="form-group">


                    <input type="email" className={"form-control" +(error && " is-invalid")} id="inputEmail" name="email" placeholder="Email" value={credentials.email} onChange={handelChange} required />
                    {error &&<p className='invalid-feedback'> {error} </p>}
                </div>

                <div className="form-group">

                    <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Mot de passe" onChange={handelChange} value={credentials.password} autoComplete="off" required />

                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="linkt" to ={
                            "/"
                }> 
                S'inscrire </Link>
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

export default FormLogin
