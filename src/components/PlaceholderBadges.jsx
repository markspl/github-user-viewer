/** @format */

import PlaceholderBadge from "./PlaceholderBadge";

const PlaceholderBadges = ({ value }) => {
    // Create 1-{value} element array with "undefined" values
    const placeholderArray = Array(Math.floor(Math.random() * value + 5)).fill();

    // Populate array
    const placeholders = placeholderArray.map((_, i) => {
        return <PlaceholderBadge key={i} value />
    });

    return placeholders;
}

export default PlaceholderBadges;