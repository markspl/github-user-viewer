/** @format */

import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import UserInfo from "./UserInfo";
import Repositories from "./Repositories";

const axios = require("axios");

const Home = () => {
    const [userInfo, setUserInfo] = useState({});
    const [repositories, setRepoInfo] = useState([]);

    const options = {
        method: "get",
        url: "https://api.github.com/users/markspl",
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Get user data from GitHub API only when page is reloaded
    useEffect(() => {
        getUserInfo();
        getRepositories();
    }, []);

    const getUserInfo = () => {
        axios({
            method: "get",
            url: "https://api.github.com/users/markspl",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            setUserInfo(res.data);
        }).catch(err => {
            console.log(`Error: ${err}`);
        });
    };

    const getRepositories = () => {
        axios({
            method: "get",
            url: "https://api.github.com/users/markspl/repos",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            setRepoInfo(res.data);
        }).catch(err => {
            console.log(`Error: ${err}`);
        });
    };

    if (!userInfo) {
        return (
            <div>
                <Row>
                    <h1>Loading...</h1>
                </Row>
            </div>
        );
    } else {
        return (
            <div className="userCard">
                <>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={2} />
                            <Col xs={3}>
                                <img
                                    src={userInfo.gravatar_id ? userInfo.gravatar_id : userInfo.avatar_url}
                                    alt={`User ${userInfo.login} avatar`}
                                    className="avatar" />
                            </Col>
                            <Col md={5} xs={9}>
                                <h1>GitHub/<a href={userInfo.html_url}>{userInfo.login}</a></h1>
                                <p className="userBio">{userInfo.bio}</p>
                            </Col>
                            <Col md={2} />
                        </Row>
                    </Container>
                    <hr />
                    <Row>
                        <Col md={4}>
                            <UserInfo data={userInfo} />
                        </Col>
                        <Col>
                            {(userInfo ? <Repositories data={repositories} />
                            : <h2>Loading...</h2>)}
                        </Col>
                    </Row>
                </>
            </div>
        )
    }
};

export default Home;
