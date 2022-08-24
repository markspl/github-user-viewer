/** @format */

import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Placeholder } from "react-bootstrap";

import UserInfo from "./UserInfo";
import Repositories from "../modules/Repositories";
import { useParams } from "react-router-dom";

const axios = require("axios");

const Home = () => {
    const { username } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [repositories, setRepoInfo] = useState([]);
    const [error, setError] = useState({ error: false, message: "" });
    const [loading, setLoading] = useState(false);

    // Get user data from GitHub API only when page is reloaded
    useEffect(() => {
        setLoading(true);

        setUserInfo({});
        setRepoInfo([]);
        setError({ error: false, message: "" });

        // Fetch all user's repositories
        const getRepositories = async () => {
            axios({
                method: "get",
                url: `https://api.github.com/users/${username}/repos?sort=updated`,
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => {
                setRepoInfo(res.data);
                setLoading(false);
            }).catch(err => {
                setError({ error: true, message: err.response.data.message });
                setLoading(false);
            });
        };

        // Fetch all user informations
        const getUserInfo = async () => {
            axios({
                method: "get",
                url: `https://api.github.com/users/${username}`,
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => {
                setUserInfo(res.data);

                // User found, let's check repos
                getRepositories();
            }).catch(err => {
                setError({ error: true, message: err.response.data.message });
                setLoading(false);
            });
        };

        if (!loading && username != null) {
            setLoading(true);
            getUserInfo();
            
            // If you want to be nasty and you got too fast internet,
            // you can try timeouter to see placeholders
            //setTimeout(() => {
            //  getUserInfo();
            //}, 4000);
        }

    }, []);

    function placeholderText(length = 6) {
        return (
            <Placeholder as="span" animation="wave">
                <Placeholder xs={length} bg="secondary" />
            </Placeholder>
        )
    }

    return (
        <div className="userCard">
            <div className="d-flex justify-content-center align-items-center">
                {(loading && username ?
                    <div className="avatar-placeholder" aria-hidden="true">
                        <div className="avatar-placeholder-inner">
                            <Spinner animation="border" variant="light">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                    : (username && Object.keys(userInfo).length && !error.error ?
                        <img
                            src={userInfo.gravatar_id ? userInfo.gravatar_id : userInfo.avatar_url}
                            alt={`User ${userInfo.login} avatar`}
                            className="avatar" />
                        : <div className="avatar-placeholder">
                            <div className="avatar-placeholder-inner"><span>:)</span></div>
                        </div>
                    )
                )}

                <div>
                    {(loading && username ?
                        (
                            <h1 style={{ minWidth: "300px" }}>GitHub/{placeholderText()}</h1>
                        ) : (username ?
                            (error.error ?
                                `<h1>GitHub/${username}</h1>`
                                : <>
                                    <h1>GitHub/<a href={userInfo.html_url}>{userInfo.login}</a></h1>
                                </>
                            ) : <h1>GitHub/user_viewer</h1>
                        )
                    )}

                    {loading && username && (
                        <>
                            {placeholderText(8)}
                            {placeholderText(5)}
                        </>
                    )}

                    {(!loading && userInfo.bio) ? <p className="userBio">{userInfo.bio}</p> : <></>}
                </div>
            </div>
            <hr />
            <Row>
                {(username && !error.error ? (
                    <Col md={4}>
                        {!loading ? (
                            <UserInfo data={userInfo} />
                        ) : <UserInfo />}
                    </Col>
                ) : <></>
                )}

                <Col>
                    {(username && !error.error) && (
                        <Repositories data={repositories} loading={loading} />
                    )}
                    {(!username && !error.error) && (
                        <>
                            <p>Get GitHub user information with address "user/username".</p>
                            <p>For example, <a href="/user/markspl">/user/markspl</a></p>
                        </>
                    )}
                    {(error.error ?
                        <>
                            <h2>Error loading information</h2>
                            <h4>{error.message}</h4>
                            <a href="/">Go back</a>
                        </>
                        : ""
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Home;
