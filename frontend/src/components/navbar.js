import React from 'react'
import logo from '../logo.png'
import '../styles/Navbar.css'
import { Link,useNavigate } from "react-router-dom";


const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate('/login'); 
    }



  return (
    <nav className="navbar navbar-expand-lg  navbar-dark colorbande">
        <div className="container">
            <Link className ="logolink" to ={
                            "/homePage"
                }> 
               <img className="logo" src={logo} alt="gropomania"/>  </Link> 
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                    <Link className="linkprofil" to ={
                            "/profil"
                            }> Profil  </Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-success btnNavbar my-2 my-sm-0" type="submit" onClick={handleLogout}>Se déconnecter</button>
                </form>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
