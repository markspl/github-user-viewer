/** @format */

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import UserInfo from "../modules/UserInfo";
import UserAvatar from "../components/UserAvatar";
import UserHeaderAndDescription from "../modules/UserHeaderAndDescription";
import Repositories from "../modules/Repositories";
import API from "../utils/API";

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

        if (!loading && username != null) {
            setLoading(true);

            // Fetch user information
            API.getData(`https://api.github.com/users/${username}`)
                .then(data => {
                    setUserInfo(data);

                    // Fetch list of repositories
                    API.getData(`https://api.github.com/users/${username}/repos?sort=updated`)
                        .then(data => {
                            setRepoInfo(data);
                            setLoading(false);
                        });
                }).catch(err => {
                    setError({ error: true, message: err.response.data.message });
                    setLoading(false);
                });

            // If you want to be nasty and you got too fast internet,
            // you can try timeouter to see placeholders
            //setTimeout(() => {
            //... 
            //}, 4000);
        }
    }, []);

    return (
        <div className="userCard">
            <div className="d-flex justify-content-center align-items-center">
                <UserAvatar values={{ username, userInfo, loading, error }} />
                <UserHeaderAndDescription values={{ username, userInfo, loading, error }} />
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
