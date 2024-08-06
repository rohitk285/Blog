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
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 gap-y-3">
                {reviews.length !== 0 && (
                reviews.map((element, index) => (
                    <div key={index} className="reviewBox">
                        <h1>Posted on : {element.postedOn}</h1>
                        <h1>Review by {element.username}</h1>
                        <h1>Name of the book : {element.bookName}</h1>
                        <h1>Rating:  {element.rating} / 5</h1>
                        <p className="mt-4 truncate">" {element.review} "</p>
                    </div>
                ))
            )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;