import Head from 'next/head';

import classes from './index.module.css';

import SignUp from './SignUp';
import SignIn from './SignIn';

import Button from '@components/UI/V1/Button';

const Auth = ({
	signType,
	setSignType,
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	return (
		<main className={`${classes.auth} main`}>
			<Head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'http://schema.org',
							'@type': 'WebPage',
							name: 'Sign in/up',
							description:
								'Sign in/up to LogNMaze | Create blogs, blogs using Markdown and share them in your social media',
							publisher: {
								'@type': 'ProfilePage',
								name: 'LogNMaze Website',
							},
						}),
					}}
				/>

				<meta property='og:url' content={`https://lognmaze.com/auth/`} />
				<meta name='twitter:url' content={`https://lognmaze.com/auth/`} />

				<meta
					property='twitter:description'
					content='Sign in/up to LogNMaze | Create blogs, blogs using Markdown and share them in
				your social media'
				/>
				<meta
					property='og:description'
					content='Sign in/up to LogNMaze | Create blogs, blogs using Markdown and share them in
				your social media'
				/>
				<meta
					name='description'
					content='Sign in/up to | LogNMaze | Create blogs, blogs using Markdown and share them in
				your social media'
				/>

				<meta
					property='twitter:title'
					content='Sign in/up | LogNMaze | Create blogs using Markdown and share to the world'
				/>
				<meta
					property='og:title'
					content='Sign in/up | LogNMaze | Create blogs using Markdown and share to the world'
				/>
				<title>
					Sign in/up | LogNMaze | Create blogs using Markdown and share to the
					world
				</title>
			</Head>
			<header className={classes.header}>
				<nav>
					<ul>
						<li
							onClick={() => {
								setSignType('in');
							}}
						>
							<Button title='Sign In'>Sign In</Button>
						</li>
						<li
							onClick={() => {
								setSignType('up');
							}}
						>
							<Button title='Sign Up'>Sign Up</Button>
						</li>
					</ul>
				</nav>
			</header>
			{signType === 'in' && (
				<SignIn
				//DynamicSignIn
				/>
			)}
			{signType === 'up' && (
				<SignUp
					// DynamicSignUp
					UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
						UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
					}
				/>
			)}
		</main>
	);
};

export default Auth;
