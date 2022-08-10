/** @format */

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import UserInfo from "./UserInfo";
import Repositories from "./Repositories";
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
        const getRepositories = async () => {
            //console.log("getrepositories");
            axios({
                method: "get",
                url: `https://api.github.com/users/${username}/repos`,
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

        const getUserInfo = async () => {
            //console.log("getuserinfo");
            axios({
                method: "get",
                url: `https://api.github.com/users/${username}`,
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => {
                setUserInfo(res.data);
                getRepositories();
            }).catch(err => {
                setError({ error: true, message: err.response.data.message });
                setLoading(false);
            });
        };

        if (!loading && username != null) {
            setLoading(true);
            getUserInfo();
        }

    }, []);

    return (
        <div className="userCard">
            <div className="clearfix d-flex justify-content-center align-items-center">
                {(username && Object.keys(userInfo).length && !error.error ?
                    <img
                        src={userInfo.gravatar_id ? userInfo.gravatar_id : userInfo.avatar_url}
                        alt={`User ${userInfo.login} avatar`}
                        className="avatar" />
                    :
                    <svg width="250" height="250" className="avatar float-md-start">
                        <rect width="100%" height="100%" fill="#ccc" />
                        <text style={{ fill: "white", fontWeight: "bold", fontSize: "40px", }} x="50%" y="60%">:)</text>
                    </svg>
                )}

                <div>
                    <h1>GitHub{username ?
                        (error.error ?
                            `/${username}`
                            :
                            <>
                                /<a href={userInfo.html_url}>{userInfo.login}</a>
                            </>
                        )
                        : "/user_viewer"
                    }
                    </h1>
                    <p className="userBio">{userInfo.bio}</p>

                </div>
            </div>
            <hr />
            <Row>
                {(username && !loading && !error.error ?
                    <Col md={4}>
                        <UserInfo data={userInfo} />
                    </Col>
                    :
                    ""
                )}
                <Col>
                    {(username ?
                        (Object.keys(userInfo).length && !loading ?
                            <Repositories data={repositories} />
                            :
                            (error.error ? "" : <h2>Loading...</h2>)
                        )
                        :
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
