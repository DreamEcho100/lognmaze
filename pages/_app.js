import React from 'react';
import Head from 'next/head';

import '../styles/_globals.scss';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='robots' content='index,follow' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>LogNMaze</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
