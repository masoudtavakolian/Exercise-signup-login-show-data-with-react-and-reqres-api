import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Card, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const setData = (page) => {
        axios.get("https://reqres.in/api/users?page=" + page.toString()).then(response => {
            setUserList([...response.data.data]);
            setPage(response.data["total_pages"]);
        }).catch(error => {
            toast.error('Error To Get Data!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    useEffect(() => {
        setData(1);
    }, []);

    let pages = [];

    for (let i = 1; i <= page; i++)
        pages.push(<Breadcrumb.Item style={{ textDecoration: "none" }} onClick={() => { setData(i) }}>page{i}</Breadcrumb.Item>);

    console.log(userList)

    return (
        <div className='App' style={{ overflow: "scroll" }}>
            <div className=' App-header' style={{ overflow: "scroll" }}>
                <Breadcrumb>
                    {
                        pages
                    }
                </Breadcrumb>
                <hr />
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
                {

                    userList.map((item, index) => {
                        return (<>
                            <Card key={index} className={"mb-3"} style={{ color: "black" }}>
                                <Card.Img src={item.avatar} />
                                <Card.Body>
                                    <Card.Title>{item['first_name'] + " " + item['last_name']}</Card.Title>
                                    <Card.Text>{item['email']}</Card.Text>
                                </Card.Body>
                            </Card>
                        </>)
                    })
                }
            </div>
        </div>
    )
}
export default Dashboard;