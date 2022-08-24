/** @format */

import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import Badges from "../components/Badges";

const Repositories = ({ data, loading }) => {

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(loading);
    },[loading]);
    
    return (
        <Container>
            <h2>Repositories</h2>
            <Badges data={data} loading={isLoading} />
        </Container>
    )
}

export default Repositories;