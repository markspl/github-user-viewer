/** @format */

import axios from "axios";

const getData = async (address) => {
    try {
        const res = await axios({
            method: "get",
            url: address,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export default { getData }