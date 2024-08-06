import { useState } from "react";
import Navbar from "./NavBar";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

function SearchPage(){

    const [searchInput, setSearchInput] = useState("");
    const [searches, setSearches] = useState([]);
    const {authUser} = useAuthContext();

    async function search(){
        try{
            let response = await axios.get('http://localhost:8000/search', {params: {authUser, searchInput}});
            response = response.data;
            setSearches(response);
            // console.log(response);
        }
        catch(err){
            console.log('Unable to fetch', err);
        }
    }

    return(
        <div className="container mx-auto">
            <Navbar />
            <div className="container mx-auto flex justify-center items-center translate-y-20">
            <input
            type="text"
            className="form-input p-2 rounded-full border border-black-500 w-1/3 mt-8 border-black"
            placeholder="Search for book reviews"
            onKeyPress={(event) => {
              //makes sure that the search button works if Enter key is pressed
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(evt) => setSearchInput(evt.target.value)}
          />
            </div>

          <div className="container mx-auto p-6 translate-y-20">
            <div className="grid grid-cols-1 gap-y-4">
                {searches.map((element, index) => (
                    <div key={index} className="reviewBox">
                        <h1>Posted on : {element.postedOn}</h1>
                        <h1>Review by {element.username}</h1>
                        <h1>Name of the book : {element.bookName}</h1>
                        <h1>Rating:  {element.rating} / 5</h1>
                        <p className="mt-4 truncate">" {element.review} "</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
    );
}

export default SearchPage;