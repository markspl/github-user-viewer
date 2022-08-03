/** @format */
import React, { useEffect, useState } from "react";

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
        const created = new Date(time);
        const now = new Date();
        const diff = Math.floor((now - created));
        const days = Math.floor(diff / (1000 * 3600 * 24));

        const createdDateString = new Date(time).toLocaleDateString("fi-FI");

        return `${days} days ago (${createdDateString})`;
    }

    if (!userInfo) {
        return (
            <div className="userCard">
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div className="userCard">
                <>
                    <div className="row">
                        <div className="center">
                            <div className="item item-left">
                                <img src={userInfo.gravatar_id ? userInfo.gravatar_id : userInfo.avatar_url} alt={`User ${userInfo.login} avatar`} className="avatar" />
                            </div>
                            <div className="item item-right">
                                <h1>GitHub/<a href={userInfo.html_url}>{userInfo.login}</a></h1>
                                <p className="userBio">{userInfo.bio}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="item">
                            <dl>
                                <dt>User ID</dt>
                                <dd>{userInfo.id}</dd>
                                <dt>Followers</dt>
                                <dd>{userInfo.followers}</dd>
                                <dt>Following</dt>
                                <dd>{userInfo.following}</dd>
                                <dt>Account created</dt>
                                <dd>{accountCreated(userInfo.created_at)}</dd>
                                <dt>Total of repos</dt>
                                <dd>{userInfo.public_repos}</dd>
                            </dl>
                        </div>
                    </div>
                </>
            </div>
        )
    }
};

export default Home;
