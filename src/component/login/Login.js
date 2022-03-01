import React, { useState } from 'react';
import axios from "axios";
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const getDataFromServer = (loginData, setToken,navigate) => {
    
    console.log(loginData);
    axios.post("https://reqres.in/api/login", loginData)
        .then(request => {toast.success('Successful ...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        setToken(request.data);
        navigate('/dashboard');})
        .catch(error => {toast.error('Wrong username or password!\nServer Message: '+error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })});
}
const Login = ({ setToken }) => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ email: "", password: ""});
    const [error, setError] = useState({ email: "", password: "" });
    const settingToken = (token) => {
        setToken(token);
        console.log("token", token);
    }
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
        <div className='App'>
            <div className=' App-header'>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    if (!Object.keys(error).length) {
                        getDataFromServer({ email: userInfo.email, password: userInfo.password }, settingToken,navigate);
                    }
                    else {
                        toast.error('Enter Items!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                }}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    Login
                    <hr />
                    <Form.Group className={"mb-3"}>
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" name='email' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                        <Form.Text>{error.email && <span>can't be empty!</span>}</Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" name='password' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                        <Form.Text>{error.password && <span>can't be empty!</span>}</Form.Text>
                    </Form.Group>
                    <div>
                        <Button variant="primary" type='submit'>Login</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default Login;
