import { useEffect, useRef, useState } from 'react';

const Image = ({ className = '', alt = '', loading = 'lazy', ...props }) => {
	const imageRef = useRef();

	const [src, setSrc] = useState('');
	const [observer, setObserver] = useState(null);

	const options = {};

	useEffect(() => {
		setTimeout(() => {
			setObserver(
				new IntersectionObserver((entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting /*  && !entry.isVisible */) {
							setSrc(props.src);
							observer.disconnect();
						}
					});
					return observer;
				}, options)
			);

			const observe = () =>
				setTimeout(
					() => (observer ? observer.observe(imageRef.current) : observe()),
					1000
				);

			observe();
		}, 100);
	}, []);

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
