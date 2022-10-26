import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import classes from './index.module.css'
import helpersClasses from '@styles/helpers.module.css'

import { INewsItemTypeBlog } from '@coreLib/ts/global'
import { imagesWeservNlLoader } from '@commonLibIndependent/image'

import CustomNextImage from '@commonComponentsDependent/CustomNextImage'
// import CustomImage from '@components/UI/V1/Image';

interface Props {
  newsItemBlogData: INewsItemTypeBlog
  newsItemDetailsType?: 'description' | 'content'
  priorityForHeaderImage: boolean
}

const NewsItemHeaderBlogInfo: FC<Props> = ({
  newsItemBlogData,
  newsItemDetailsType,
  priorityForHeaderImage = false,
}) => {
  const router = useRouter()

  return (
    <div>
      {!router.query.slug && newsItemBlogData.type === 'blog' ? (
        <Link
          href={`/blogs/${newsItemBlogData.type_data.slug}`}
          prefetch={false}
          title={`${newsItemBlogData.type} | ${newsItemBlogData.type_data.title}`}
          className={classes.title}
        >
          {newsItemDetailsType === 'description' ? (
            <h2>{newsItemBlogData.type_data.title}</h2>
          ) : (
            <h1>{newsItemBlogData.type_data.title}</h1>
          )}
        </Link>
      ) : (
        <h1 className={classes.title}>{newsItemBlogData.type_data.title}</h1>
      )}
      <CustomNextImage
        src={imagesWeservNlLoader({
          url: newsItemBlogData.type_data.image_src,
          w: 800,
          // h: 500,
        })}
        width={800}
        height={500}
        alt={newsItemBlogData.type_data.image_alt}
        className={classes.img_wrapper}
        priority={priorityForHeaderImage}
      />
      <p className={classes.tags}>
        {newsItemBlogData.type_data.tags && (
          <>
            <span className={helpersClasses.fontWeightBold}>Tags:</span>{' '}
            {newsItemBlogData.type_data.tags?.join(', ')}
          </>
        )}
      </p>
    </div>
  )
}

export default NewsItemHeaderBlogInfo
