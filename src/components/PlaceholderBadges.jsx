/** @format */

import PlaceholderBadge from "./PlaceholderBadge";

const PlaceholderBadges = ({ value }) => {
    // Create 1-{value} element array
    const placeholderArray = Array(Math.floor(Math.random() * value + 5));

    // Populate array
    const placeholders = placeholderArray.map((_, i) => {
        return <PlaceholderBadge key={i} value />
    });

    return placeholders;
}

export default PlaceholderBadges;