/** @format */

import { Placeholder } from "react-bootstrap";

const PlaceholderText = ({ length = 6 }) => {
    // TODO: Works now only for length 5 and up.
    return (
        <Placeholder as="span" animation="wave">
            <Placeholder xs={length} bg="secondary" />
        </Placeholder>
    )
}

export default PlaceholderText;