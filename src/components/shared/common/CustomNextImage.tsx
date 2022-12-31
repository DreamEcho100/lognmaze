import Image from 'next/image';
import type { ImageProps } from 'next/dist/client/image.d';
import { useEffect, useState } from 'react';
import { websiteBasePath } from '@utils/core/app';

export interface CustomNextImageProps extends Omit<ImageProps, 'alt'> {
	className?: string;
	placeholder?: 'blur' | 'empty';
	role?: string;
	alt?: string;
	weservNlOptimized?: boolean;
	isAnimated?: boolean;
}

const CustomNextImage = ({
	className = '',
	unoptimized = true,
	weservNlOptimized = true,
	isAnimated,
	src,
	alt = '',
	placeholder = 'blur',
	blurDataURL = '/svgs/bbblurry.svg',
	...props
}: CustomNextImageProps) => {
	const [isWeservNlOptimized, setIsWeservNlOptimized] =
		useState(weservNlOptimized);
	const [_src, setSrc] = useState(src);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (src !== _src) {
			setSrc(src);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [src]);

	const handleImageProps = () => {
		const imageProps: Omit<CustomNextImageProps, 'alt'> & { alt: string } = {
			onError: () => {
				if (isWeservNlOptimized) {
					setIsLoaded(true);
					setIsWeservNlOptimized(false);
					return;
				}

				setIsLoaded(true);
				setSrc(
					// '/images/image-error.png'
					'/svg/bbblurry.svg'
				);
			},
			src:
				isWeservNlOptimized && typeof _src === 'string'
					? `//images.weserv.nl/?url=${encodeURIComponent(
							_src.startsWith('/') ? `${websiteBasePath}/${_src}` : _src
					  )}&w=${props.width}${props.height ? `&h=${props.height}` : ''}${
							isAnimated ? '&n=-1' : ''
					  }&output=webp&q=90`
					: _src,
			className: `${className} ${isLoaded ? '' : 'no-content'}`,
			onLoadingComplete: () => {
				setIsLoaded(true);
			},
			unoptimized,
			placeholder,
			blurDataURL,
			alt,
			...props
		};

		return imageProps;
	};

	// eslint-disable-next-line jsx-a11y/alt-text
	return <Image {...handleImageProps()} />;
};

export default CustomNextImage;
