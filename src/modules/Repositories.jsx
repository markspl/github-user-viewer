/** @format */

import React from "react";

import { Container, Badge } from "react-bootstrap";
import PlaceholderBadges from "../components/PlaceholderBadges"

const Repositories = ({ data, loading }) => {
    const length = data.length;

    const calculateBackground = (index) => {
        //rpg(100,200,0) green
        //rpg(255,100,0) red
        //155 / -100
        const [origR, origG, R, G] = [100, 200, 155, 100]

        // Value divided by the count of repositories
        const red = Math.floor(R / length);
        const green = Math.floor(G / length);

        if (length >= 10) {
            // More repositores, let's make gradient smooooother
            return `rgb(${origR + (red * index)}, ${origG - (green * index)}, 0)`;
        } else {
            // A few only, let's show only darker green variants
            return `rgb(${origR + (Math.floor(R / 10) * index)}, ${origG - (Math.floor(G / 10) * index)}, 0)`;
        }
    }

    if (data && length > 0) {
        return (
            <Container>
                <h2>Repositories</h2>
                <div className="badges">
                    {data.map((element, index) => {
                        return (
                            <Badge
                                key={element.id}
                                title={`Last updated: ${new Date(element.updated_at).toLocaleDateString("fi-FI")} ${new Date(element.updated_at).toLocaleTimeString("fi-FI")}`}
                                style={{ marginRight: "4px", background: calculateBackground(index), cursor: "default" }}
                                bg="">{element.name}</Badge>
                        );
                    })}
                </div>
            </Container>
        );
    } else {
        if (length === 0 && loading) {
            return (
                <Container>
                    <h2>Repositories</h2>
                    <div className="badges">
                        <PlaceholderBadges value={10}/>
                    </div>
                </Container>
            );
        } else {
            return (
                <Container>
                    <h2>Repositories</h2>
                    <p>No repositories.</p>
                </Container>
            );
        }
    }
}

export default Repositories;