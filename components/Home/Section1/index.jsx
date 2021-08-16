import { useRouter } from 'next/router';

import classes from './index.module.css';

import Feed from '@components/UI/V1/News/Feed/Feed';
import Wrapper from '@components/UI/V1/Wrapper';
import Button from '@components/UI/V1/Button';
import CreateNewsButton from '@components/UI/V1/Button/CreateNews';

const Section1 = ({ news = [], userExist }) => {
	const router = useRouter();

	return (
		<main className={classes['main-section']}>
			<Feed news={news} />

			<section className={classes['side-section']}>
				<Wrapper>
					<section>
						<h2>Welcome</h2>
					</section>
				</Wrapper>
				<Wrapper>
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
	);
};

export default Section1;
