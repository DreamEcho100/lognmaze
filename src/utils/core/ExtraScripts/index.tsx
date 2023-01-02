/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '@utils/common/gtag';
// import pAddScript from './pAddScript';
// import CustomNextImage from '@commonComponentsDependent/CustomNextImage'
import PungentTagAntiAdBlock from './Pungent tag Anti-AdBlock';
// import * as in_page_push_banner_tag_anti_adblock from './in_page_push_banner_tag_anti_adblock';
import CustomNextImage from '@components/shared/common/CustomNextImage';

const ExtraScripts = () => {
	const router = useRouter();
	const [isPlayingScripts, setIsPlayingScripts] = useState(false);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;

		const timeoutId = setTimeout(() => {
			setIsPlayingScripts(true);
		}, 7000);

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
				strategy='lazyOnload'
				async
				id='Interstitial'
				data-cfasync='false'
				src='//upgulpinon.com/1?z=5042305'
			/>
			<Script
				strategy='lazyOnload'
				// strategy='lazyOnload'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id='pungent_tag_anti_adBlock'
				strategy='lazyOnload'
				dangerouslySetInnerHTML={{
					__html: PungentTagAntiAdBlock
				}}
			/>
			{/* <Script
				strategy='lazyOnload'
				id='googletagmanager'
				// strategy='lazyOnload'
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/> */}
			<Script
				strategy='worker'
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
			<Script
				// strategy='lazyOnload'
				strategy='worker'
				id='google-analytics-script'
				src='https://stootsou.net/pfe/current/tag.min.js?z=4990432'
				async
			/>
			{/* <!-- Yandex.Metrika counter -->
			<Script
				id='lognmaze_metrika_yandex'
				strategy='lazyOnload'
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
				strategy='lazyOnload'
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
				strategy='worker'
				dangerouslySetInnerHTML={{
					__html: `    (function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
				})(window, document, "clarity", "script", "8co4gbipfa");`
				}}
			/>
			{/* <Script
				id='superior-tag'
				strategy='lazyOnload'
				src='https://uwoaptee.com/pfe/current/tag.min.js?z=5012612'
				data-cfasync='false'
				async
			/>
			<Script
				strategy='lazyOnload'
				// strategy='lazyOnload'
				id='pAddScript'
				data-cfasync={false}
				dangerouslySetInnerHTML={{
					__html: pAddScript
				}}
				async
			/>
			<Script
				id='in_page_push_banner_tag_anti_adblock-1'
				strategy='lazyOnload'
				dangerouslySetInnerHTML={{
					__html: in_page_push_banner_tag_anti_adblock.tx1
				}}
			/>
			<Script
				id='in_page_push_banner_tag_anti_adblock-2'
				strategy='lazyOnload'
				dangerouslySetInnerHTML={{
					__html: in_page_push_banner_tag_anti_adblock.tx2
				}}
			/> */}
			{/* <Script
				id='luminous-tag'
				strategy='lazyOnload'
				dangerouslySetInnerHTML={{
					__html:
						"(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5011496,document.body||document.documentElement)",
				}}
			/> */}
			{/* <Script
				id='Push-Notifications-tag-Anti-AdBlock'
				strategy='lazyOnload'
				src='https://boustahe.com/pfe/current/tag.min.js?z=5105214'
				data-cfasync='false'
				async
			/> */}
		</>
	);
};

export default ExtraScripts;
