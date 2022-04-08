import Head from 'next/head';

import helpersClasses from '@styles/helpers.module.css';

const Custom404 = () => {
	return (
		<main className={helpersClasses.main}>
			<Head>
				<meta name='robots' content='noindex,nofollow' />
				<meta name='description' content='404 | Not Found | LogNMaze' />
				<title>404 | Not Found | LogNMaze</title>
			</Head>
			<h1>404 | Page Not Found</h1>
		</main>
	);
};

export default Custom404;
