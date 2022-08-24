/** @format */

const NotFound = () => {
    const style = {
        fontWweight:"bold",
        color: "red",
    };

	return (
		<div>
			<p>
                <span style={style}>404</span> Not Found
            </p>
            <a href="/">Go back</a>
		</div>
	);
};

export default NotFound;
