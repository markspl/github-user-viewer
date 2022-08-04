/** @format */

import React, { useEffect, useState } from "react";
import { Row, Col, Container, ListGroup } from "react-bootstrap";

const axios = require("axios");

const Home = () => {
    const [userInfo, setUserInfo] = useState({});

    const options = {
        method: "get",
        url: "https://api.github.com/users/markspl",
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Create dates ready
    const now = new Date();

    // Get user data from GitHub API only when page is reloaded
    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = () => {
        axios(options)
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
    };

    const accountCreated = (time) => {
        const created = new Date(userInfo.created_at);
        const diff = Math.floor((now - created));
        const days = Math.floor(diff / (1000 * 3600 * 24));

        const createdDateString = new Date(time).toLocaleDateString("fi-FI");

        return `${days} days ago (${createdDateString})`;
    }

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
                            <Col md={3} xs={3}>
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
                            <ListGroup>
                                <ListGroup.Item><span className="userInfoItem">User ID:</span> {userInfo.id}</ListGroup.Item>
                                <ListGroup.Item><span className="userInfoItem">Followers:</span> {userInfo.followers}</ListGroup.Item>
                                <ListGroup.Item><span className="userInfoItem">Following:</span> {userInfo.following}</ListGroup.Item>
                                <ListGroup.Item>
                                    <span className="userInfoItem">Account created:</span> {accountCreated(userInfo.created_at)}
                                </ListGroup.Item>
                                <ListGroup.Item><span className="userInfoItem">Total of repos:</span> {userInfo.public_repos}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <p>User <i>{userInfo.login}</i> information</p>
                        </Col>
                    </Row>
                </>
            </div>
        )
    }
};

export default Home;
