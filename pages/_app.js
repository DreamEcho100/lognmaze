// import App from 'next/app';
import Head from 'next/head';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
	faUser,
	// faGlobe,
	faEllipsisV,
	// faEllipsisH,
	// faSlidersH,
	// faCog,
	// faCogs,
	faComment,
	faComments,
	faCommentSlash,
	// faShare,
	// faShareAlt,
	// faInfo,
	faArrowUp,
	faLongArrowAltUp,
	faArrowDown,
	faLongArrowAltDown,
	faCopy,
	faBookReader,
} from '@fortawesome/free-solid-svg-icons';
import {
	// fab,
	faFacebook,
	faLinkedin,
	faReadme,
	faReddit,
	faTelegram,
	faTumblr,
	faTwitter,
	faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
library.add(
	faUser,
	// faGlobe,
	faEllipsisV,
	// faEllipsisH,
	// faSlidersH,
	// faCog,
	// faCogs,
	faComment,
	faComments,
	faCommentSlash,
	// faShare,
	// faShareAlt,
	// faInfo,
	faArrowUp,
	faLongArrowAltUp,
	faArrowDown,
	faLongArrowAltDown,
	faCopy,
	faBookReader,
	//
	// fab,
	faFacebook,
	faLinkedin,
	faReddit,
	faTelegram,
	faTumblr,
	faTwitter,
	faWhatsapp
);

import '@styles/_globals.css';

// import {
// 	getCookie,
// } from '@lib/v1/cookie';
// import { verifyJwtToken } from '@lib/v1/auth';

import Layout from '@components/Layout/Layout';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='robots' content='index,follow' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<meta property='og:locale' content='en_US' />
				<meta property='og:type' content='website' />
				<meta property='og:site_name' content='LogNMaze' />

				{/* <!-- icon created by ColourCreatype at https://freeicons.io/profile/5790 --> */}
				{/* <!-- Icon by 106171237606937156455 (https://freeicons.io/profile/5790) on freeicons.io (https://freeicons.io/) --> */}

				<link rel='icon' href='/favicon.ico' size='any' />
				<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />

				<meta name='twitter:card' content='summary' />

				<meta property='og:url' content='https://lognmaze.com/' />
				<meta name='twitter:url' content='https://lognmaze.com/' />

				<meta name='twitter:url' content='https://lognmaze.com/' />
				<meta
					property='og:description'
					content='Create articles in Markdown and share them in your different social media platform'
				/>
				<meta
					name='description'
					content='Create articles in Markdown and share them in your different social media platform'
				/>
				<meta name='twitter:title' content='LogNMaze' />
				<meta property='og:title' content='LogNMaze' />
				<title>LogNMaze</title>
			</Head>
			<Layout isAuthenticated={pageProps.isAuthenticated}>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default MyApp;

// MyApp.getInitialProps = async (appContext) => {
// 	// calls page's `getInitialProps` and fills `appProps.pageProps`
// 	// const appProps = await App.getInitialProps(appContext);

// 	if (appContext.ctx.req) {
// 		const cookie = appContext.ctx.req.headers.cookie;

// 		const tokenCookie = getCookie({
// 			cookieName: 'user_token',
// 			cookieString: cookie,
// 		});

// 		let isAuthenticated = false;

// 		if (tokenCookie.length !== 0) {
// 			isAuthenticated = await verifyJwtToken(token);

// 		return {
// 			pageProps: {
// 				isAuthenticated,
// 				// ...appProps,
// 			},
// 		};
// 	}

// 	return {
// 		pageProps: {},
// 	};
// };
