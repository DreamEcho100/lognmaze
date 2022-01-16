import { useEffect, useState } from 'react';
import Head from 'next/head';
// import { YMInitializer } from 'react-yandex-metrika';
// import LogRocket from 'logrocket';
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
	faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
	// fab,
	faFacebook,
	faLinkedin,
	// faReadme,
	faReddit,
	faTelegram,
	faTumblr,
	faTwitter,
	faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
// import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
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
	faEdit,
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

// import DefaultSEOProps from '../next-seo.config';
// import { DefaultSeo } from 'next-seo';
// import NextSeo from 'next-seo';

import '@styles/_global.css';
import '@styles/_globals.css';
import '@styles/_helpers.css';

import Layout from '@components/Layout/Layout';
import ExtraScripts from '@components/_app/ExtraScripts';

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

const MyApp = ({ Component, pageProps }) => {
	const [playingScripts, isPlayingScripts] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			isPlayingScripts(true);
		}, 5000);
	}, []);

	return (
		<>
			{/* <DefaultSeo {...DefaultSEOProps} /> */}
			<Head>
				{
					'<!-- icon created by ColourCreatype at https://freeicons.io/profile/5790 -->'
				}
				{
					'<!-- Icon by 106171237606937156455 (https://freeicons.io/profile/5790) on freeicons.io (https://freeicons.io/) -->'
				}
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='robots' content='index,follow' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<meta property='og:locale' content='en_US' />
				<meta property='og:type' content='website' />
				<meta property='og:site_name' content='LogNMaze' />

				<link rel='icon' href='/favicon.ico' size='any' />
				<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
				<link rel='icon' href='/favicon.ico' type='image/png' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />

				<meta name='twitter:card' content='summary' />

				<meta property='og:url' content='https://lognmaze.com/' />
				<meta name='twitter:url' content='https://lognmaze.com/' />

				<meta
					name='twitter:description'
					content='Create blogs in Markdown and share them in your different social media platform'
				/>
				<meta
					property='og:description'
					content='Create blogs in Markdown and share them in your different social media platform'
				/>
				<meta
					name='description'
					content='Create blogs in Markdown and share them in your different social media platform'
				/>

				<meta
					name='twitter:title'
					content='LogNMaze | Create blogs using Markdown and share to the world'
				/>
				<meta
					property='og:title'
					content='LogNMaze | Create blogs using Markdown and share to the world'
				/>
				<title>
					LogNMaze | Create blogs using Markdown and share to the world
				</title>
			</Head>
			<Layout isAuthenticated={pageProps.isAuthenticated}>
				<Component {...pageProps} />
			</Layout>
			{playingScripts && <ExtraScripts />}
		</>
	);
};

export default MyApp;
