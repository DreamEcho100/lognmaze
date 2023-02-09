import type { NextSeoProps } from 'next-seo';
import type { User, UserProfile, UserStats } from '@prisma/client';
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import type { Person } from 'schema-dts';

import { UserGender } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@server/db/client';
import { useTypedSession } from '@utils/common/hooks';
import { useMemo } from 'react';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cx } from 'class-variance-authority';

import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import Head from 'next/head';
import { jsonLdScriptProps } from 'react-schemaorg';
import { defaultSiteName } from '@utils/core/app';
import { useGetFullURLPathName } from '@components/shared/common/hooks';
import CreativeWorksFeed from '@components/shared/core/CreativeWorks/Feed';

type UserProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const UserProfilePage: NextPage<UserProfilePageProps> = (props) => {
	const fullURLPathName = useGetFullURLPathName();
	const { data: session, status } = useTypedSession();
	const userData = useMemo(() => {
		let userData;
		if (status === 'authenticated' && session.user.id === props.userData.id) {
			userData = {
				...props.userData,
				...session.user,
				Profile: {
					...(props.userData?.Profile || {}),
					...(session.user.Profile || {}),
					createdAt: props.userData?.Profile.createdAt || new Date()
				},
				isVisitorTheOwner: true,
				createdAt: props.userData.createdAt
			};
		} else userData = props.userData;

		return userData;
	}, [props.userData, session?.user, status]);

	if (!userData?.Profile.id || !userData?.Stats.id) return <></>;

	return (
		<>
			{/* https://developers.google.com/search/docs/appearance/structured-data/ */}
			<Head>
				<script
					id='jsonLdBlogPostingScript'
					{...jsonLdScriptProps<Person>({
						'@context': 'https://schema.org',
						'@type': 'Person',
						// knowsAbout: ['Compilers', 'Computer Science'],
						name: `${userData.Profile.firstName} ${userData.Profile.lastName} - ${userData.name}`,
						url: fullURLPathName,
						description: userData.Profile.bio || undefined,
						jobTitle: userData.Profile.work || undefined,
						image: userData.Profile.profilePicture || undefined
					})}
				/>
			</Head>
			<CustomNextSeo
				title={`${userData.Profile.firstName} ${userData.Profile.lastName} - ${userData.name} | ${defaultSiteName}`}
				description={userData.Profile.bio || undefined}
				openGraph={{
					type: 'Profile',
					profile: {
						firstName: userData.Profile.firstName,
						lastName: userData.Profile.lastName,
						username: userData.name,
						gender: userData.Profile.gender === UserGender.M ? 'male' : 'female'
					},
					images: !userData.Profile.profilePicture
						? undefined
						: (() => {
								const images: NonNullable<NextSeoProps['openGraph']>['images'] =
									[
										{
											url: userData.Profile.profilePicture,
											alt: `${userData.Profile.firstName} ${userData.Profile.lastName} - ${userData.name}`,
											width: 800,
											height: 500
										}
									];

								// if (CreativeWork.Author?.Profile?.profilePicture)
								// 	images.push(CreativeWork.Author?.Profile?.profilePicture);

								return images;
						  })()
				}}
			/>
			<section className={cx('color-theme-100', 'md:section-p md:rounded-lg')}>
				<div
					className={cx(
						'relative mb-14 flex h-80 w-full items-end justify-center p-8',
						'md:mb-0 md:justify-end'
					)}
				>
					<CustomNextImage
						priority
						src={userData.Profile.coverPhoto || '/svgs/bbblurry.svg'}
						width={1800}
						height={400}
						className='absolute top-0 right-0 bottom-0 left-0 aspect-video h-full w-full object-cover'
					/>
					<CustomNextImage
						priority
						src={userData.Profile.profilePicture || '/svgs/bbblurry.svg'}
						width={400}
						height={400}
						className='relative aspect-square h-52 w-52 translate-y-1/2 rounded-full object-cover'
					/>
				</div>
				<div className='px-8 py-8 md:px-0'>
					<h1 className='text-h1'>
						{userData.Profile.firstName} {userData.Profile.lastName}
					</h1>
					<p>{userData.Profile.work}</p>
					<p>{userData.Profile.education}</p>
					<p>
						Joined at{' '}
						<time dateTime={userData.Profile.createdAt?.toISOString()}>
							{userData.Profile.createdAt?.toLocaleDateString()}
						</time>
					</p>
				</div>
			</section>
			<div
				className={cx(
					'section-p-y xl-2-sm:section-p color-theme-200 flex flex-grow gap-4',
					'flex-col',
					'md:flex-row'
				)}
			>
				<MetaSection
					bio={userData.Profile.bio}
					showOnScreens={{ 'lt-md-only': true }}
				/>
				<div className='md:w-3/5'>
					<CreativeWorksFeed
						getAllCreativeWorksInput={{
							authorId: userData.id,
							checkForPrivileges: userData.isVisitorTheOwner
						}}
					/>
				</div>
				<MetaSection
					bio={userData.Profile.bio}
					showOnScreens={{ 'gt-md-only': true }}
				/>
			</div>
		</>
	);
};
const MetaSection = ({
	bio,
	showOnScreens
}: {
	bio?: string | null;
	showOnScreens?: {
		'lt-md-only'?: boolean;
		'gt-md-only'?: boolean;
	};
}) => {
	return (
		<div
			className={cx(
				'w-full md:w-2/5',
				showOnScreens?.['gt-md-only'] ? 'hidden md:flex md:flex-col' : '',
				showOnScreens?.['lt-md-only'] ? 'flex flex-col md:hidden' : ''
			)}
		>
			<BioSection bio={bio} />
		</div>
	);
};

const BioSection = ({ bio }: { bio?: string | null }) => {
	return (
		<section className='section-p-sm color-theme-100'>
			<header>
				<h2 className='text-h2'>Bio</h2>
			</header>
			<article>
				<p>{bio}</p>
			</article>
		</section>
	);
};

export const getStaticPaths = async () => {
	const paths = await prisma.user
		.findMany({ select: { name: true } })
		.then((result) =>
			result.map((user) => ({ params: { username: user.name } }))
		);

	return {
		paths,
		// Array<string | { params: { [key: string]: string } }>,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<{
	userData: User & {
		isVisitorTheOwner: boolean;
		Profile: UserProfile;
		Stats: UserStats;
	};
}> = async ({ params }) => {
	const result = await z
		.object({ username: z.string() })
		.safeParseAsync(params);

	if (!result.success) return { notFound: true };

	const username = result.data.username;

	const userData = (await prisma.user.findFirstOrThrow({
		include: {
			Profile: true,
			Stats: true
			// creativeWorks: {
			// 	take: 10,
			// 	orderBy: { createdAt: 'desc' }
			// }
		},
		where: { name: username, AND: { role: { not: null } } }
	})) as
		| (User & {
				isVisitorTheOwner: boolean;
				Profile: UserProfile;
				Stats: UserStats;
		  })
		| null;

	if (!userData || !userData.Profile || !userData.Stats)
		return { notFound: true };

	userData.isVisitorTheOwner = false;

	return { props: { userData }, revalidate: 5 * 60 };
};

export default UserProfilePage;
