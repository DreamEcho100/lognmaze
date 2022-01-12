import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './index.module.css';

import CustomImage from '@components/UI/V1/Image';

const NewsBlogInfo = ({
	newsItemData,
	isLoadingSkeleton,
	detailsType,
	setShowModal,
}) => {
	const router = useRouter();

	return (
		<div>
			{!router.query.slug && newsItemData?.type === 'blog' ? (
				<Link href={`/blog/${newsItemData?.slug}`} prefetch={false} passHref>
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
			{/* <div
				className={`${classes.img_wrapper} ${
					isLoadingSkeleton
						? `${classes.isLoadingSkeleton} skeleton-loading`
						: ''
				}`}
			> */}
			<CustomImage
				src={newsItemData?.image_src}
				alt={newsItemData?.image_alt}
				effect='blur'
				className={`${classes.img_wrapper} ${
					isLoadingSkeleton
						? `${classes.isLoadingSkeleton} skeleton-loading`
						: ''
				}`}
				onClick={() => {
					if (setShowModal) setShowModal(true);
				}}
			/>
			{/* </div> */}
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

export default NewsBlogInfo;
