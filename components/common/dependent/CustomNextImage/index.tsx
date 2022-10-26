import Image from 'next/image'
import { ImageProps } from 'next/dist/client/image.d'

import classes from './index.module.css'

interface ICustomNextImageProps extends ImageProps {
  className?: string
  placeholder?: 'blur' | 'empty'
  role?: string
}

const CustomNextImage = ({
  className = '',
  unoptimized = true,
  src,
  alt = '',
  placeholder = 'empty',
  blurDataURL,
  ...props
}: ICustomNextImageProps) => {
  const wrapperProps = {
    className: `${className} ${classes['img-container']} ${classes['layout-fill']}`,
  }
  const handleImageProps = () => {
    const imageProps: ICustomNextImageProps = {
      unoptimized,
      src,
      placeholder,
      className: `${className} ${classes['img-container']} ${classes['layout-fill']}`,
      alt: '',
      ...props,
    }

    if (placeholder !== 'empty') {
      if (blurDataURL) imageProps.blurDataURL = blurDataURL
      else if (src && typeof src === 'string') imageProps.blurDataURL = src
    }

    return imageProps
  }

  return <Image {...handleImageProps()} />
}

export default CustomNextImage
