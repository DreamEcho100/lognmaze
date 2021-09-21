import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoadImageComponent = ({
	className = '',
	src = '',
	alt = '',
	...props
}) => {
	const LazyLoadImageProps = {
		src,
		alt,
	};

	if (props.height) LazyLoadImageProps.height = height;
	if (props.width) LazyLoadImageProps.width = width;

	return (
		<LazyLoadImage
			className={className}
			effect='blur'
			{...LazyLoadImageProps}
		/>
	);
};

export default LazyLoadImageComponent;
