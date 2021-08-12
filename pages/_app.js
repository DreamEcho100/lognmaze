import Head from 'next/head';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebook,
	faTwitter,
	faLinkedin,
	faTumblr,
	faWhatsapp,
	faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
// import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
library.add(
	faFacebook,
	faTwitter,
	faLinkedin,
	faTumblr,
	faWhatsapp,
	faTelegram
);

import '@styles/_globals.scss';
import Layout from '@components/Layout/Layout';

const MyApp = ({ Component, pageProps }) => {
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
};

export default MyApp;
