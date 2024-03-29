/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '@utils/common/gtag';
import CustomNextImage from '@components/shared/common/CustomNextImage';

const ExtraScripts = () => {
	const router = useRouter();
	const [isPlayingScripts, setIsPlayingScripts] = useState(false);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;

		const timeoutId = setTimeout(() => {
			setIsPlayingScripts(true);
		}, 8000);

		return () => timeoutId && clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (!isPlayingScripts) return;
		const handleRouteChange = (url: string) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [isPlayingScripts, router.events]);

	if (!isPlayingScripts) return <></>;

	// const adsbygoogleProps = {
	// 	['data-ad-client']: 'ca-pub-8030984398568253',
	// };

	return (
		<>
			<Script
				strategy='afterInteractive'
				// strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			{/* <Script
				strategy='afterInteractive'
				id='googletagmanager'
				// strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/> */}
			<Script
				strategy='afterInteractive'
				id='gogleanalytics'
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
				}}
			/>
			{/* <!-- Yandex.Metrika counter -->
			<Script
				id='lognmaze_metrika_yandex'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

					ym(88776635, "init", {
								clickmap:true,
								trackLinks:true,
								accurateTrackBounce:true
					});`,
				}}
			/>
			<noscript>
				<div>
					<img
						src='https://mc.yandex.ru/watch/88776635'
						style={{
							position: 'absolute',
							left: '-9999px',
						}}
						alt=''
					/>
				</div>
			</noscript>
			<!-- /Yandex.Metrika counter --> */}
			{/* k */}

			<Script
				strategy='afterInteractive'
				id='lognmaze-yandex-counter'
				dangerouslySetInnerHTML={{
					__html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
			 
					ym(85004128, "init", {
							 clickmap:true,
							 trackLinks:true,
							 accurateTrackBounce:true
					});`
				}}
			/>
			<noscript>
				<div>
					<CustomNextImage
						src='https://mc.yandex.ru/watch/85004128'
						style={{
							position: 'absolute',
							left: '-9999px'
						}}
						width={1}
						height={1}
						alt=''
						priority
					/>
				</div>
			</noscript>
			{/* <!-- /Yandex.Metrika counter --> */}
			<Script
				id='MicrosoftClarity'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `    (function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
				})(window, document, "clarity", "script", "8co4gbipfa");`
				}}
			/>

			{/* google-adsense-h-responsive-image-v1 */}
			{/* id='google-adsense-h-responsive-image-v1' */}
			{/* <Script
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030984398568253'
				crossOrigin='anonymous'
			/> */}
			<Script
				strategy='afterInteractive'
				id='google-ad-sense-id'
				async
				// defer
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8030984398568253'
				crossOrigin='anonymous'
				data-ad-client='ca-pub-8030984398568253'
				onError={(err) => console.error('Script failed to load', err)}
			></Script>
		</>
	);
};

export default ExtraScripts;
