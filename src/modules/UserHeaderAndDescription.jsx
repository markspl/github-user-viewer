/** @format */

import { useEffect, useState } from "react";

import PlaceholderText from "../components/PlaceholderText";

const UserHeaderAndDescription = ({ values }) => {

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

    return (
        <div>
            {(data.loading && data.username ?
                (
                    <h1 style={{ minWidth: "300px" }}>GitHub/<PlaceholderText /></h1>
                ) : (data.username ?
                    (data.error.error ?
                        <h1 className="github-name">GitHub/{data.username}</h1>
                        : <>
                            <h1>GitHub/<a href={data.userInfo.html_url}>{data.userInfo.login}</a></h1>
                        </>
                    ) : <h1>GitHub/user_viewer</h1>
                )
            )}

            {data.loading && data.username && (
                <>
                    <PlaceholderText length={8} />
                    <PlaceholderText length={5} />
                </>
            )}

            {(!data.loading && data.userInfo.bio) ? <p className="userBio">{data.userInfo.bio}</p> : <></>}
        </div>
    );
}

export default UserHeaderAndDescription;