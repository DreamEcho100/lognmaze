import { useRouter } from 'next/router';

import classes from './Hero.module.css';
import Button from '../../UI/V1/Button';

const Hero = ({ user = {} }) => {
	const router = useRouter();

	return (
		<section className={classes.hero}>
			{!user.id && (
				<div>
					<Button onClick={() => router.replace('/auth')}>Sign In</Button> or{' '}
					<Button onClick={() => router.replace('/auth?sign-type=up')}>
						Sign Up
					</Button>
				</div>
			)}
		</section>
	);
};

export default Hero;
