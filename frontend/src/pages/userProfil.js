import"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
import"bootstrap/dist/css/bootstrap.min.css"
import Profil from '../components/profil' 
import Navbar from '../components/navbar' 

function userP() {
  return (
    <div>
      <Navbar/>
      <Profil/>
    </div>
    
  );
}

export default userP;
