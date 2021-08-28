import { useRouter } from 'next/router';

import classes from './index.module.css';

import { NewsContextProvider } from '@store/NewsContext';

import Feed from '@components/UI/V1/News/Feed/Feed';
import Wrapper from '@components/UI/V1/Wrapper';
import Button from '@components/UI/V1/Button';
import CreateNewsButton from '@components/UI/V1/Button/CreateNews';

const Section1 = ({ news = [], userExist }) => {
	const router = useRouter();

	return (
		<NewsContextProvider>
		<main className={classes['main-section']}>
			<section className={classes['section-1']}>
					<Feed news={news} />
			</section>

			<section className={classes['section-2']}>
				<Wrapper style={{ width: '100%' }}>
					<section>
						<h2>Welcome</h2>
					</section>
				</Wrapper>
				<Wrapper style={{ width: '100%' }}>
					{!userExist && (
						<section>
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
				</NewsContextProvider>
	);
};

export default Section1;
