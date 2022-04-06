import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

interface IProps {
	statusCode: number;
}

const Custom500: NextPage<IProps> = ({ statusCode }) => {
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

export const getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Custom500;
