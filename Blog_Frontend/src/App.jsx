import LoginPage from "../Authentication/LoginPage";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import RegisterPage from "../Authentication/RegisterPage";
import HomePage from "./components/HomePage";
import Review from "./components/Review";
import { useAuthContext } from "../context/AuthContext";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";

function App(){

  const {authUser} = useAuthContext();
  
  return (
    <Router>
      <div className="flex h-screen">
        <Routes>
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />}/>
          <Route path='/register' element={authUser ? <Navigate to="/" /> : <RegisterPage />}/>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
          <Route path='/review' element={authUser ? <Review /> : <Navigate to="/login" />}/>
          <Route path='/search' element={authUser ? <SearchPage /> : <Navigate to="/login" />}/>
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;