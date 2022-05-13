/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '@commonLibIndependent/gtag';
import pAddScript from './pAddScript';
import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import PungentTagAntiAdBlock from './Pungent tag Anti-AdBlock';

const ExtraScripts = () => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: string) => {
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
				async
				id='Interstitial'
				data-cfasync='false'
				src='//upgulpinon.com/1?z=5042305'
			/>
			<Script
				strategy='afterInteractive'
				// strategy='worker'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id='Pungent tag Anti-AdBlock'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: PungentTagAntiAdBlock,
				}}
			/>
			{/* <Script
				strategy='worker'
				id='googletagmanager'
				// strategy='worker'
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
          `,
				}}
			/>
			<Script
				// strategy='afterInteractive'
				strategy='afterInteractive'
				id='google-analytics-script'
				src='https://stootsou.net/pfe/current/tag.min.js?z=4990432'
				async
			/>
			{/* <!-- Yandex.Metrika counter -->
			<Script
				strategy='afterInteractive'
				id='YandexMetrika'
				dangerouslySetInnerHTML={{
					__html: `   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
			 
					ym(85004128, "init", {
							 clickmap:true,
							 trackLinks:true,
							 accurateTrackBounce:true,
							 webvisor:true
					});`,
				}}
			/> */}
			{/* k */}
			{/* <!-- Yandex.Metrika counter --> */}
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
			{/* <!-- /Yandex.Metrika counter --> */}
			{/* k */}
			<Script
				id='MicrosoftClarity'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `    (function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
				})(window, document, "clarity", "script", "8co4gbipfa");`,
				}}
			/>

			<noscript>
				<div>
					<CustomNextImage
						src='https://mc.yandex.ru/watch/85004128'
						style={{
							position: 'absolute',
							left: '-9999px',
						}}
						alt=''
					/>
				</div>
			</noscript>
			{/* <!-- /Yandex.Metrika counter --> */}
			<Script
				id='superior-tag'
				strategy='afterInteractive'
				src='https://uwoaptee.com/pfe/current/tag.min.js?z=5012612'
				data-cfasync='false'
				async
			/>
			<Script
				strategy='afterInteractive'
				// strategy='worker'
				id='pAddScript'
				data-cfasync={false}
				dangerouslySetInnerHTML={{
					__html: pAddScript,
				}}
				async
			/>
			{/* <Script
				id='luminous-tag'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html:
						"(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5011496,document.body||document.documentElement)",
				}}
			/> */}
		</>
	);
};

export default ExtraScripts;
