import Image from 'next/image';

import classes from './styles.module.css';

const ImageComponent = ({
	className = '',
	unoptimized = true,
	layout = 'fill',
	src,
	alt = '',
	placeholder = 'empty',
	blurDataURL,
	role = 'img',
	...props
}) => {
	if(!src) {
		return <></>;
	}

	const wrapperProps = {
		className: `${className} ${classes['img-container']} ${classes['layout-fill']}`,
	};
	const imageProps = (() => {
		const imhProps = {
			unoptimized,
			layout,
			src,
			placeholder,
			role,
			...props,
		};

		if (placeholder !== 'empty') {
			imhProps.blurDataURL = blurDataURL ? blurDataURL : src;
		}

		return imhProps;
	})();

	return (
		<div {...wrapperProps}>
			<Image alt={alt} {...imageProps} />
		</div>
	);
};

export default ImageComponent;
