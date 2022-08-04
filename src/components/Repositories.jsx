import React from "react";

import { Container, Row, Badge } from "react-bootstrap";

const Repositories = ({ data }) => {

    const length = data.length;

    const sortByUpdated = (array) => {

        // Sort by comparing element.updated_at
        const sorter = () => {
            return function (a, b) {
                if (a["updated_at"] < b["updated_at"]) return 1;
                else if (a["updated_at"] > b["updated_at"]) return -1;
                else return 0;
            }
        }

        // Return sorted array
        return (array.sort(sorter()))
    }

    if (data !== []) {
        sortByUpdated(data);
    };

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
        return (length === 0 ? (
            <Container>
                <Row>
                    <h2>Repositories</h2>
                    <p>No repositories</p>
                </Row>
            </Container>
        ) : (
            <Container>
                <Row>
                    <h2>Repositories</h2>
                    <div>Loading...</div>);
                </Row>
            </Container>
        ));
    }
}

export default Repositories;