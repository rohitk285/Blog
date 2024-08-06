import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [reason, setReason] = useState(null);
    const navigate = useNavigate();
    
    async function register(evt) {
        evt.preventDefault(); // Prevent default form submission
        if(username.length < 4 || username.length > 32){
            setReason('username');
            return; }
        else if(password.length < 6){
            setReason('password');
            return; }
        else if(password !== cPassword){
            setReason('matching');
            return; }

        try{
            await axios.post(`http://localhost:8000/register`, {username, password});
            navigate('/login');
        }
        catch(err){
            if (err.response && err.response.status === 409)
                setReason('usernameTaken');
            else 
                console.log(err);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{
            background: 'linear-gradient(to bottom, #006666, black)',
            width: '100%',
            height: '100%'
        }}>
            <div className="p-6 bg-white rounded-lg shadow-lg" style={{ 
                width: '384px', 
                height: '480px',
                }}>
                <h2 className="text-2xl font-bold mb-3">Register</h2>
                <form onSubmit={register}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">Set username :</label>
                        <input
                            type="text"
                            placeholder="Set username"
                            className="form-input w-full p-2 border border-gray-300 rounded"
                            name="username"
                            onChange={evt => setUsername(evt.target.value)}
                            required
                        />
                    </div>

                    {reason === 'username' && (
                        <p className="text-xs text-red-700">Username must have 4-32 characters</p>)}
                    {reason === 'usernameTaken' && (
                        <p className="text-xs text-red-700">Username already taken</p>)}

                    <div className="mb-4">
                        <label htmlFor="passwd" className="block text-gray-700 mb-2">Set your password :</label>
                        <input
                            type="password"
                            placeholder="Set password"
                            className="form-input w-full p-2 border border-gray-300 rounded"
                            name="passwd"
                            onChange={evt => setPassword(evt.target.value)}
                            required
                        />
                    </div>

                    {reason === 'password' && (
                        <p className="text-xs text-red-700">Password must have at least 6 characters</p>)}

                    <div className="mb-4">
                        <label htmlFor="passwd" className="block text-gray-700 mb-2">Confirm password :</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="form-input w-full p-2 border border-gray-300 rounded"
                            name="passwd"
                            onChange={evt => setCPassword(evt.target.value)}
                            required
                        />
                    </div>
                    
                    {reason === 'matching' && (
                        <p className="text-xs text-red-700">Passwords don't match</p>)}

                    <button
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >Register</button>
                    <div className="flex justify-center items-center mt-2">
                    <h2 className="mr-2 text-gray-600">Already have an account ? </h2>
                    <Link to="/login" className="text-blue-700 hover:underline">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
