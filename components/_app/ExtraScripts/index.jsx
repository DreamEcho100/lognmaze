import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '@lib/v1/gtag';

const ExtraScripts = () => {
	const router = useRouter();
	const [playingScripts, isPlayingScripts] = useState(false);

	useEffect(() => {
		if (!playingScripts) return;

		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events, playingScripts]);

	useEffect(() => {
		setTimeout(() => {
			isPlayingScripts(true);
		}, 5000);
	}, []);

	// const adsbygoogleProps = {
	// 	['data-ad-client']: 'ca-pub-8030984398568253',
	// };

	if (!playingScripts) {
		return <></>;
	}

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
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				strategy='afterInteractive'
				// id='google-analytics-script'
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
				}}
			/>
		</>
	);
};

export default ExtraScripts;
