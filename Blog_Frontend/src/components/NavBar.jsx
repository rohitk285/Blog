import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {setAuthUser} = useAuthContext();

  async function logout(){
    try{
      await axios.post('http://localhost:8000/logout');
      setAuthUser(null);
      navigate('/login');
    }
    catch(err){
      console.log('Error logging out', err);
    }
  }

  return (
    <nav className="p-4 bg-white w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-black text-2xl font-semibold">BookLog</Link>
        </div>
        <div className="space-x-8">
          <Link to="/" className="menu">Home</Link>
          <Link to="/search" className="menu">Search</Link>
          <Link to="/review" className="menu">Write a review</Link>
          <Link to="/profile" className="menu">Profile</Link>
          <button onClick={logout} className="menu">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
