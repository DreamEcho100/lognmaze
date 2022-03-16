import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './index.module.css';

import { INewsItemTypeBlog } from '@coreLib/ts/global';

import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
// import CustomImage from '@components/UI/V1/Image';

interface Props {
	newsItemBlogData: INewsItemTypeBlog;
	newsItemDetailsType?: 'description' | 'content';
}

const NewsItemHeaderBlogInfo: FC<Props> = ({
	newsItemBlogData,
	newsItemDetailsType,
	// setShowModal,
}) => {
	const router = useRouter();

	return (
		<div>
			{!router.query.slug && newsItemBlogData.type === 'blog' ? (
				<Link
					href={`/blogs/${newsItemBlogData.type_data.slug}`}
					prefetch={false}
					passHref
				>
					<a
						title={`${newsItemBlogData.type} | ${newsItemBlogData.type_data.title}`}
						className={classes.title}
					>
						{newsItemDetailsType === 'description' ? (
							<h2>{newsItemBlogData.type_data.title}</h2>
						) : (
							<h1>{newsItemBlogData.type_data.title}</h1>
						)}
					</a>
				</Link>
			) : (
				<h1 className={classes.title}>{newsItemBlogData.type_data.title}</h1>
			)}
			<CustomNextImage
				src={newsItemBlogData.type_data.image_src}
				alt={newsItemBlogData.type_data.image_alt}
				className={classes.img_wrapper}
			/>
			<p className={classes.tags}>
				{newsItemBlogData.type_data.tags && (
					<>
						<strong>Tags:</strong> {newsItemBlogData.type_data.tags?.join(', ')}
					</>
				)}
			</p>
		</div>
	);
};

export default NewsItemHeaderBlogInfo;
