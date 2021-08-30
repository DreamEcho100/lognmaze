import { useRouter } from 'next/router';

import classes from './Hero.module.css';
import Button from '@components/UI/V1/Button';

const Hero = ({ user = {} }) => {
	const router = useRouter();

	return (
		<section className={classes.hero}>
			{!user.id && (
				<div>
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
				</div>
			)}
		</section>
	);
};

export default Hero;
