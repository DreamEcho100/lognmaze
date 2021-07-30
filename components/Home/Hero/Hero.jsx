import { useRouter } from 'next/router';

import classes from './Hero.module.css';
import Button from '../../UI/V1/Button';

const Hero = ({ user = {} }) => {
	const router = useRouter();

	return (
		<section className={classes.hero}>
			<h1>Home Page Here {':)'}</h1>
			{!user.id && (
				<Button onClick={() => router.replace('/auth?sign-type=up')}>
					Sign Up
				</Button>
			)}
		</section>
	);
};

export default Hero;
