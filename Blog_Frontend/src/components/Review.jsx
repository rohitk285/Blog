import { useState } from "react";
import Navbar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Review(){

    const [bookName, setBookName] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const {authUser} = useAuthContext();
    const navigate = useNavigate();

    async function postReview(evt){
        evt.preventDefault();
        try{
            await axios.post('http://localhost:8000/postReview', {authUser, bookName, rating, review});
            navigate('/');
        }
        catch(err){
            console.log('Unable to upload', err);
        }
    }

    return (
        <div className="container mx-auto">
            <Navbar />
              <div className="flex flex-col justify-evenly items-center translate-y-20">
                  <h2 className="text-2xl font-bold mb-2 mt-6">Write your review</h2>
                  <form onSubmit={(evt) => postReview(evt)} className="w-full p-14">
                      <div className="mb-2">
                        <label htmlFor="bookName" className="label">Name of the book :</label>
                        <input
                        type="text"
                        placeholder="Enter name of book"
                        className="ml-8 form-input w-1/3 p-2 border border-gray-300 rounded"
                        name="bookName"
                        value={bookName}
                        onChange={(evt) => setBookName(evt.target.value)}
                        required/>
                      </div>
  
                      <div className="mb-2">
                        <label htmlFor="rating" className="label">Rating : </label>
                        <input
                        type="number"
                        min = "0"
                        max = "5"
                        step = "0.5"
                        value = {rating}
                        className="ml-8 form-input w-1/15 text-center p-2 border border-gray-300 rounded"
                        name="rating"
                        onChange={(evt) => setRating(evt.target.value)}
                        required/>
                      </div>

                      <div className="mb-2">
                          <label htmlFor="textarea" className="label">Your review:</label>
                          <textarea name="textarea" 
                          rows="4" cols="30"
                          placeholder="Type review here"
                          style={{border: '1.5px solid #090909'}}
                          onChange={(evt) => setReview(evt.target.value)} />
                      </div>
  
                      <button type="submit" 
                      className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xl">
                      Post review</button>
                  </form>
              </div>
          </div>
    );

}

export default Review;