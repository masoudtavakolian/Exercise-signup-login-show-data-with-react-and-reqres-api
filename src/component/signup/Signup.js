import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import "../../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const registerUser = (loginData, setToken, navigate) => {
    console.log(loginData);

    axios.post("https://reqres.in/api/register", loginData)
        .then(request => {
            toast.success('Successfuly Signup!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setToken(request.data);
            navigate('/dashboard');
        })
        .catch(error => {
            toast.error("Error... \n server message: " + error.response.data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        });
}
const Signup = ({ setToken }) => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [error, setError] = useState({ firstName: "", lastName: "", email: "", password: "" });
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
        <div className='App'>
            <div className=' App-header'>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    if (!Object.keys(error).length) {
                        registerUser({ email: userInfo.email, password: userInfo.password }, settingToken, navigate);

                    }
                    else {
                        toast.error('We Need All items!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        console.log(error)
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
                    Signup
                    <hr />
                    <Form.Group className={"mb-3"}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name='firstName' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                        <Form.Text>{error.firstName && <span>can't be empty!</span>}</Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name='lastName' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                        <Form.Text>{error.lastName && <span>can't be empty!</span>}</Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                        <Form.Text>{error.email && <span>can't be empty!</span>}</Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' onFocus={e => { setInfoValue(e) }} onChange={e => { setInfoValue(e) }} />
                        <Form.Text>{error.password && <span>can't be empty!</span>}</Form.Text>
                    </Form.Group>

                    <div>
                        <Button type='submit'>Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default Signup;
