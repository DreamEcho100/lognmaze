import { useEffect, useRef, useState } from 'react';

const WrapperComponent = (Component) => (props) => {
	const wrapperElementRef = useRef();
	const [enterViewCounter, setEnterViewCounter] = useState(0);

	const options = {};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			console.log(entry);
			setEnterViewCounter((prev) => prev + 1);
		});
	}, options);

	// observer.observe(wrapperElementRef.current);

	useEffect(() => observer.observe(wrapperElementRef.current), []);

	console.log(enterViewCounter);

	return (
		<div ref={wrapperElementRef}>
			<Component {...props} enterViewCounter={enterViewCounter} />
		</div>
	);
};

export default WrapperComponent;
