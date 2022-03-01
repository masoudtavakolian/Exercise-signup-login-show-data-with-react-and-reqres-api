import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const registerUser = (loginData, setToken,navigate) => {
    console.log(loginData); 
    
    axios.post("https://reqres.in/api/register", loginData)
        .then(request => {
            setToken(request.data);
            
            navigate('/dashboard');
            
            
        })
        .catch(error => alert("server can't signup user! \n server message: "+error.response.data.error));
}
const Signup = ({ setToken }) => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [error, setError] = useState({firstName:"",lastName:"",email:"",password:""});
    const settingToken = (token) => {
        setToken(token);
        console.log("token", token);
    }
    console.log(error)
    const setInfoValue = (event) => {
        if (!event.target.value) {
            setError({ ...error, [event.target.name]: true })
            setTimeout(() => {
                console.table(error)
            }, 1000);
        }
        else {
            delete error[event.target.name];
            setError(error)
            setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
            setTimeout(() => {
                console.table(userInfo)
            }, 1000);
        }
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (!Object.keys(error).length)
                registerUser({ email: userInfo.email, password: userInfo.password }, settingToken,navigate);
            else{
                alert("Please write all items!")
                console.log(error)
            }

        }}>
            signup:<br />
            <label style={{ display: "flex", flexDirection: "column" }}>
                <p>First Name</p>
                <input type="text" name='firstName' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                {error.firstName && <span>can't be empty!</span>}
            </label>
            <label>
                <p>Last Name</p>
                <input type="text" name='lastName' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                {error.lastName && <span>can't be empty!</span>}
            </label>
            <label>
                <p>Email</p>
                <input type="text" name='email' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                {error.email && <span>can't be empty!</span>}
            </label>

            <label>
                <p>Password</p>
                <input type="password" name='password' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                {error.password && <span>can't be empty!</span>}
            </label>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}
export default Signup;
