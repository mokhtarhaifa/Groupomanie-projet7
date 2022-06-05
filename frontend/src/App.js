import"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
import"bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Acceuil from "./pages/Acceuil"
import Login from "./pages/Login"
import Signup from "./pages/Singup"
import Profil from "./pages/userProfil"
import {HashRouter, Routes, Route } from "react-router-dom"
function App() {
  return (
    // permet de gerer des routes commençant par #
    <HashRouter> 
      <div>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Signup/>} />
            <Route path="/homePage" element={<Acceuil/>} />
            <Route path="/profil" element={<Profil/>} />
        </Routes>
    </div>
    </HashRouter>
    
    
  );
}

export default App;
