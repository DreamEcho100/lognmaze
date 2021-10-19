import { useRouter } from 'next/router';

import classes from './index.module.css';

import { handleAddingLoadingSkeletonClass } from '@/lib/v1/className';
import { useUserSharedState } from '@store/UserContext';
import { NewsContextSharedProvider } from '@store/NewsContext';

import Feed from '@components/UI/V1/News/Feed';
import Wrapper from '@components/UI/V1/Wrapper';
import Button from '@components/UI/V1/Button';
import CreateNewsButton from '@components/UI/V1/Button/CreateNews';

const Section1 = ({
	isLoadingSkeleton,
	news = [],
	userExist,
	newsFetchRouteQuery,
}) => {
	const router = useRouter();

	const [userState, userDispatch] = useUserSharedState();

	return (
		<NewsContextSharedProvider>
			<main className={classes['main-section']}>
				<section className={classes['section-1']}>
					<Feed
						isLoadingSkeleton={isLoadingSkeleton}
						news={news}
						newsFetchRouteQuery={newsFetchRouteQuery}
					/>
				</section>

				<section className={classes['section-2']}>
					<Wrapper style={{ width: '100%' }}>
						<section>
							<h3>Welcome</h3>
						</section>
					</Wrapper>
					<Wrapper
						className={handleAddingLoadingSkeletonClass(
							isLoadingSkeleton && userState.isVerifyingUserLoading,
							classes,
							classes.wrapper
						)}
						style={{ width: '100%' }}
					>
						{!userExist && (
							<section className='buttons-holder'>
								<Button title='Sign In' onClick={() => router.replace('/auth')}>
									Sign In
								</Button>{' '}
								or{' '}
								<Button
									title='Sign Up'
									onClick={() => router.replace('/auth?sign-type=up')}
								>
									Sign Up
								</Button>
							</section>
						)}
						<CreateNewsButton />
					</Wrapper>
				</section>
			</main>
		</NewsContextSharedProvider>
	);
};

export default Section1;
