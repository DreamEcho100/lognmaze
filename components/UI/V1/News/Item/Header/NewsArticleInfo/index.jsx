import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './index.module.css';

import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const NewsArticleInfo = ({
	newsItemData,
	isLoadingSkeleton,
	detailsType,
	setShowModal,
}) => {
	const router = useRouter();

	return (
		<div>
			{!router.query.slug && newsItemData?.type === 'article' ? (
				<Link href={`/article/${newsItemData?.slug}`} prefetch={false} passHref>
					<a
						title={`${newsItemData?.type} | ${newsItemData?.title}`}
						className={`${classes.title} ${
							isLoadingSkeleton
								? `${classes.isLoadingSkeleton} skeleton-loading`
								: ''
						}`}
					>
						{detailsType === 'description' ? (
							<h2>{newsItemData?.title}</h2>
						) : (
							<h1>{newsItemData?.title}</h1>
						)}
					</a>
				</Link>
			) : (
				<h1
					className={`${classes.title} ${
						isLoadingSkeleton
							? `${classes.isLoadingSkeleton} skeleton-loading`
							: ''
					}`}
				>
					{newsItemData?.title}
				</h1>
			)}
			<div
				className={`${classes.img_wrapper} ${
					isLoadingSkeleton
						? `${classes.isLoadingSkeleton} skeleton-loading`
						: ''
				}`}
			>
				<LazyLoadImage
					src={newsItemData?.image_src}
					alt={newsItemData?.image_alt}
					effect='blur'
					onClick={() => {
						if (setShowModal) setShowModal(true);
					}}
				/>
			</div>
			<p
				className={`${classes.tags} ${
					isLoadingSkeleton
						? `${classes.isLoadingSkeleton} skeleton-loading`
						: ''
				}`}
			>
				{newsItemData.tags && (
					<>
						<strong>Tags:</strong> {newsItemData?.tags?.join(', ')}
					</>
				)}
			</p>
		</div>
	);
};

// export default NewsArticleInfo;

const newsArticleInfoPropsAreEqual = (
	prevNewsArticleInfo,
	nextNewsArticleInfo
) => {
	return (
		prevNewsArticleInfo.isLoadingSkeleton ===
			nextNewsArticleInfo.isLoadingSkeleton &&
		prevNewsArticleInfo.updated_at === nextNewsArticleInfo.updated_at
	);
};

const MemoizedNewsArticleInfo = memo(
	NewsArticleInfo,
	newsArticleInfoPropsAreEqual
);

export default MemoizedNewsArticleInfo;
