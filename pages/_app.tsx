import type { AppProps } from 'next/app';
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { YMInitializer } from 'react-yandex-metrika';
// import LogRocket from 'logrocket';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
	faUser,
	faEllipsisV,
	faComment,
	faComments,
	faCommentSlash,
	faArrowUp,
	faLongArrowAltUp,
	faArrowDown,
	faLongArrowAltDown,
	faCopy,
	faBookReader,
	faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
	faFacebook,
	faLinkedin,
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
	faEllipsisV,
	faComment,
	faComments,
	faCommentSlash,
	faArrowUp,
	faLongArrowAltUp,
	faArrowDown,
	faLongArrowAltDown,
	faCopy,
	faBookReader,
	faEdit,
	faFacebook,
	faLinkedin,
	faReddit,
	faTelegram,
	faTumblr,
	faTwitter,
	faWhatsapp
);

import '../styles/globals.css';

import { UserContextSharedProvider } from 'store/UserContext';

import MainLayoutComponent from '@coreComponents/Layout/Main';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserContextSharedProvider>
			<MainLayoutComponent>
				<Component {...pageProps} />
			</MainLayoutComponent>
		</UserContextSharedProvider>
	);
}

export default MyApp;
