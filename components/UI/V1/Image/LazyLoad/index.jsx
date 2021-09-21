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
		loading: 'lazy',
	};

	if (props.height) LazyLoadImageProps.height = height;
	if (props.width) LazyLoadImageProps.width = width;
	if (props.effect) LazyLoadImageProps.effect = effect;

	return <LazyLoadImage className={className} {...LazyLoadImageProps} />;
};

export default LazyLoadImageComponent;
