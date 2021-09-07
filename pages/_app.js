// import App from 'next/app';
import Head from 'next/head';
import { YMInitializer } from 'react-yandex-metrika';
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
	faReadme,
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

import '@styles/_globals.css';

import Layout from '@components/Layout/Layout';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='robots' content='index,follow' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				{/* {'<!-- Yandex.Metrika counter -->'}
				<script
					type='text/javascript'
					dangerouslySetInnerHTML={{
						__html: `
						(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
						m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
						(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

						ym(85004128, "init", {
									clickmap:true,
									trackLinks:true,
									accurateTrackBounce:true,
									webvisor:true
						});
					`,
					}}
				></script>
				{'<!-- /Yandex.Metrika counter -->'} */}

				{/* <!-- Yandex.Metrika counter -->
				<script type="text/javascript" >
					(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

					ym(85004128, "init", {
								clickmap:true,
								trackLinks:true,
								accurateTrackBounce:true,
								webvisor:true
					});
				</script>
				<noscript><div><img src="https://mc.yandex.ru/watch/85004128" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
				<!-- /Yandex.Metrika counter -->
				<noscript>
					<div>
						<img
							src='https://mc.yandex.ru/watch/85004128'
							style='position:absolute; left:-9999px;'
							alt=''
						/>
					</div>
				</noscript> */}

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
				<title>
					LogNMaze | Create blogs, articles using Markdown {'&'} share them in
					your social media
				</title>
				<link
					rel='preconnect'
					// rel='preload'
					href='https://fonts.googleapis.com'
				/>
				<link
					rel='preconnect'
					// rel='preload'
					href='https://fonts.gstatic.com'
					// crossorigin
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap'
					rel='stylesheet'
					// rel='preload'
				/>
			</Head>
			{/* <noscript>
				<div>
					<img
						src='https://mc.yandex.ru/watch/85004128'
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript> */}
			<YMInitializer accounts={[85004128]} />
			<Layout isAuthenticated={pageProps.isAuthenticated}>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default MyApp;
