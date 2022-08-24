/** @format */

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const UserAvatar = ({ values }) => {

    const defaultValues = {
        username: "",
        userInfo: {},
        loading: true,
        error: { error: false, message: "" },
    }

    const [data, setData] = useState(defaultValues);

    // Update values when one of "defaultValues" changes
    useEffect(() => {
        setData(values);
    }, [values]);

    if (data.loading && data.username) {
        // Show placeholder loader
        return (
            <div className="avatar-placeholder" aria-hidden="true">
                <div className="avatar-placeholder-inner">
                    <Spinner animation="border" variant="light">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        )
    } else {
        if (data.username && Object.keys(data.userInfo).length && !data.error.error) {
            // Show avatar (Gravatar or avatar url)
            return (
                <img
                    src={data.userInfo.gravatar_id ? data.userInfo.gravatar_id : data.userInfo.avatar_url}
                    alt={`User ${data.userInfo.login} avatar`}
                    className="avatar" />
            )
        } else {
            // Show default placeholder ":)"
            // If error, show ":("
            <div className="avatar-placeholder">
                <div className="avatar-placeholder-inner">
                    {!data.error?.error ?
                        <span>:)</span>
                        : <span>:(</span>
                    }
                </div>
            </div>
        }
    }
}

export default UserAvatar;