import Image from 'next/image';

import classes from './styles.module.css';

const ImageComponent = ({
	className = '',
	unoptimized = true,
	layout = 'fill',
	src,
	alt = '',
}) => {
	const wrapperProps = {
		className: `${className} ${classes['img-container']}`,
	};
	const imageProps = {
		unoptimized,
		layout,
		src,
	};

	return (
		<div {...wrapperProps}>
			<Image alt={alt} {...imageProps} />
		</div>
	);
};

export default ImageComponent;
