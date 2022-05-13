import"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
import"bootstrap/dist/css/bootstrap.min.css"
import Navbar from '../components/navbar' 
import Publications from '../components/publications' 
function Acceuil() {
  return (
    <div>
      <Navbar/>
      <Publications/>
    </div>
    
  );
}

export default Acceuil;
