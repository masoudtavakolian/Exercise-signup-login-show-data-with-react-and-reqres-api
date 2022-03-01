import React, { useState } from 'react';
import axios from "axios";

const getDataFromServer = (loginData,setToken) => {
    console.log(loginData);
    axios.post("https://reqres.in/api/login", loginData)
    .then(request => setToken(request.data) )
    .catch(error => alert(`Wring username or password! ${error.response.data}`));
}
const Login = ({ setToken }) => {
    const [username, setUsername] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const settingToken = (token)=>{
        setToken(token);
        console.log("token", token);
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            getDataFromServer({ email: username, password: password },settingToken);
            
        }}>
            <label>
                <p>username</p>
                <input type="text" onChange={e => { setUsername(e.target.value) }} />
            </label>

            <label>
                <p>password</p>
                <input type="password" onChange={e => { setPassword(e.target.value) }} />
            </label>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}
export default Login;
