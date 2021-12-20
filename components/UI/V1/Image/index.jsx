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
	...props
}) => {
	if(!src) {
		return <></>;
	}

	const wrapperProps = {
		className: `${className} ${classes['img-container']} ${classes['layout-fill']}`,
	};
	const imageProps = (() => {
		const temp = {
			unoptimized,
			layout,
			src,
			placeholder,
			...props,
		};

		if (placeholder !== 'empty') {
			temp.blurDataURL = blurDataURL ? blurDataURL : src;
		}

		return temp;
	})();

	return (
		<div {...wrapperProps}>
			<Image alt={alt} {...imageProps} />
		</div>
	);
};

export default ImageComponent;
