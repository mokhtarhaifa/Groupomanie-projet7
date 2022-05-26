import axios from 'axios'
import React,{useState} from 'react'
import '../styles/Login.css'

const FormSignup = () => {

    const [user, setUser]=useState({
        firstName:"",
        lastName:"",
        email: "",
        password: ""
    })

    const [errors, setErrors]=useState({
        firstName:"",
        lastName:"",
        email: "",
        password: ""
    })
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
        
    try{
        const response = await axios.post("http://localhost:3001/auth/signup", user)
        console.log(response)
    }
    catch (error){
        console.log(error.res)
    }
        console.log(user);
    }
    



  return (
    <div id="LoginForm" className="container">
    <div className="login-form">
        <div className="main-div">
            <div className="panel">
                <h2>Inscrivez-vous</h2>
            </div>
            <form id="Signup" onSubmit={handelSubmit}>
                <div className="form-group">

                    <input type="text" className="form-control"  id="firstName" name="firstName" placeholder="Prénom" error={errors.firstName} value={user.firstName} onChange={handelChange}  />

                </div>

                <div className="form-group">

                    <input type="text" className="form-control"  id="lastName" name="lastName" placeholder="Nom" error={errors.lastName} value={user.lastName} onChange={handelChange}  />
                    
                </div>

                <div className="form-group">

                    <input type="email" className="form-control"  id="inputEmail" name="email" placeholder="Email" error={errors.email} value={user.email} onChange={handelChange}  />
                    
                </div>

                <div className="form-group">

                    <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Mot de passe" error={errors.password} value={user.password} onChange={handelChange}  />

                </div>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
                
            </form>
        </div>
    </div>
</div>	

  )
}

export default FormSignup
