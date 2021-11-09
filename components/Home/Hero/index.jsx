import classes from './index.module.css';

const Hero = ({ user = {} }) => {
	return (
		<section className={classes.hero}>
				<h1>Hero</h1>
		</section>
	);
};

export default Hero;
