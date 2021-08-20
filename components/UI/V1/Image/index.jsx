import { useEffect, useRef, useState } from 'react';
// import classes from './index.module.css';

// import { handleAllClasses } from '../utils/index';

const Image = ({
	// defaultClasses = 'button',
	// extraClasses = '',
	className = '',
	alt = '',
	loading = 'lazy',
	...props
}) => {
	const imageRef = useRef();

	const [src, setSrc] = useState('');

	const options = {};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			setSrc(props.src);
			observer.disconnect();
		});
	}, options);

	useEffect(() => observer.observe(imageRef.current), []);

	useEffect(() => {
		if (props.src !== src) setSrc(props.src);
	}, [props.src]);

	const imageProps = {
		className,
		alt,
		ref: imageRef,
		loading,
		...props,
	};

	return <img {...imageProps} src={src} />;
};

export default Image;
