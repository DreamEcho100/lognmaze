import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '@lib/v1/gtag';
import pAddScript from './pAddScript';

const ExtraScripts = () => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	// const adsbygoogleProps = {
	// 	['data-ad-client']: 'ca-pub-8030984398568253',
	// };

	return (
		<>
			{/* <script
      id='ad-client-script'
      async
      crossOrigin='anonymous'
      src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      // {...adsbygoogleProps}
      data-ad-client='ca-pub-8030984398568253'
      // data-checked-head={false}
    /> */}
			<Script
				strategy='afterInteractive'
				// strategy='worker'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				strategy='afterInteractive'
				// strategy='worker'
				id='google-analytics-script'
				src='https://stootsou.net/pfe/current/tag.min.js?z=4990432'
				async
			/>
			<Script
				strategy='afterInteractive'
				// strategy='worker'
				data-cfasync='false'
				type='text/javascript'
				defer
				dangerouslySetInnerHTML={{
					__html: pAddScript,
				}}
			/>
		</>
	);
};

export default ExtraScripts;
