import Head from 'next/head';

const Custom500 = ({ statusCode }) => {
	return (
		<main className='main'>
			<Head>
				<meta name='robots' content='noindex,nofollow' />
				<meta
					name='description'
					content={`
					${statusCode} | ${
						statusCode
							? `An error ${statusCode} occurred on server`
							: 'An error occurred on client'
					} | LogNMaze`}
				/>
				<title>
					{statusCode} |{' '}
					{statusCode
						? `An error ${statusCode} occurred on server`
						: 'An error occurred on client'}{' '}
					| LogNMaze
				</title>
			</Head>
			<h1>
				{statusCode} |{' '}
				{statusCode
					? `An error ${statusCode} occurred on server`
					: 'An error occurred on client'}{' '}
				| LogNMaze
			</h1>
		</main>
	);
};

export const getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Custom500;
