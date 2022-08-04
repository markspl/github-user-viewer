/** @format */

import React from "react";
import { ListGroup } from "react-bootstrap";

const Userinfo = ({ data }) => {
    // Create dates ready
    const now = new Date();

    const accountCreated = (time) => {
        const created = new Date(data.created_at);
        const diff = Math.floor((now - created));
        const days = Math.floor(diff / (1000 * 3600 * 24));

        const createdDateString = new Date(time).toLocaleDateString("fi-FI");

        return `${days} days ago (${createdDateString})`;
    }

    return (
        <ListGroup>
            <ListGroup.Item>
                <span className="userInfoItem">User ID:</span> {data.id}
            </ListGroup.Item>
            <ListGroup.Item>
                <span className="userInfoItem">Followers:</span> {data.followers}
            </ListGroup.Item>
            <ListGroup.Item>
                <span className="userInfoItem">Following:</span> {data.following}
            </ListGroup.Item>
            <ListGroup.Item>
                <span className="userInfoItem">Account created:</span> {accountCreated(data.created_at)}
            </ListGroup.Item>
            <ListGroup.Item>
                <span className="userInfoItem">Total of repos:</span> {data.public_repos}
            </ListGroup.Item>
        </ListGroup>
    );
}

export default Userinfo;