import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "./NavBar";
import axios from "axios";

function HomePage(){

    const [reviews, setReviews] = useState([]);
    const {authUser, setAuthUser} = useAuthContext();

    useEffect(() => {
        async function fetchSelfReview(){
            try{
                let response = await axios.get('http://localhost:8000/selfReview', {params: {authUser}});
                response = response.data;
                setReviews(response);
            }
            catch(err){
                console.log("Error - Unable to fetch", err);
            }
        }
        fetchSelfReview();
    },[]);

    return (
        <div className="container mx-auto">
            <Navbar />
            <h1 className="text-4xl font-bold mb-6 text-black mt-6">Welcome back {authUser}</h1>
        </div>
    );
}

export default HomePage;