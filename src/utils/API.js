/** @format */

import axios from "axios";

const getData = (address) => {
    console.log(address);

    return axios({
        method: "get",
        url: address,
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
};

export default { getData }