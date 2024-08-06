import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "./NavBar";
import axios from "axios";
import { useState } from "react";

function ProfilePage(){

    const {authUser} = useAuthContext();
    const [reviewCount, setReviewCount] = useState(0);
    const [date, setDate] = useState("");

    useEffect(() => {
        async function getReviewCount(){
            try{
                let count = await axios.get('http://localhost:8000/selfReview', {params:{authUser}});
                count = count.data.length;
                setReviewCount(count);
            }
            catch(err){
                console.log("Error while fetching data", err);
            }
        }
        getReviewCount();
    },[]);

    useEffect(() => {
        async function getDate(){
            try{
                let response = await axios.get('http://localhost:8000/getDate', {params:{authUser}});
                setDate(response.data.createdOn);
            }
            catch(err){
                console.log("Error while fetching date", err);
            }
        }
        getDate();
    },[]);

    return (
        <div className="container mx-auto">
            <Navbar />
            <div className="container mx-auto p-6">
            <ul className="text-lg font-bold">
                <li>Username: {authUser}</li>
                <li>Reviews posted: {reviewCount}</li>
                <li>Account created on {date}</li>
            </ul>
            </div>
        </div>
    );
}

export default ProfilePage;