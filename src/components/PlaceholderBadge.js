/** @format */

import { Placeholder } from "react-bootstrap";

const PlaceholderBadge = () => {
    return (
        <Placeholder style={{ width: `${Math.floor(Math.random() * 10) + 5}em` }} as="span" className="badge bg-dark" animation="wave">
            <Placeholder as="span" />
        </Placeholder>
    );
}

export default PlaceholderBadge;