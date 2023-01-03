import { useEffect, useState } from 'react';

const GoogleAdsenseHResponsiveImageV1 = () => {
	// const [isPlayingScripts, setIsPlayingScripts] = useState(false);

	// useEffect(() => {
	// 	if (process.env.NODE_ENV === 'development') return;

	// 	const timeoutId = setTimeout(() => {
	// 		setIsPlayingScripts(true);
	// 	}, 9000);

	// 	return () => timeoutId && clearTimeout(timeoutId);
	// }, []);

	useEffect(() => {
		// if (!isPlayingScripts) return;

		const pushAd = () => {
			try {
				const adsbygoogle = (window as any).adsbygoogle;
				console.log({ adsbygoogle });
				adsbygoogle.push({});
			} catch (e) {
				console.error(e);
			}
		};

		const interval = setInterval(() => {
			// Check if Adsense script is loaded every 300ms
			if ((window as any).adsbygoogle) {
				pushAd();
				// clear the interval once the ad is pushed so that function isn't called indefinitely
				clearInterval(interval);
			}
		}, 300);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<ins
			className='adsbygoogle'
			style={{ display: 'block', aspectRatio: '16 / 9' }}
			data-ad-client='ca-pub-8030984398568253'
			data-ad-slot='3437464395'
			data-ad-format='auto'
			data-full-width-responsive='true'
		></ins>
	);
	/*
	<Script
		id=''
		dangerouslySetInnerHTML={{
			__html: `(adsbygoogle = window.adsbygoogle || []).push({});`
		}}
/>
	*/
};

export default GoogleAdsenseHResponsiveImageV1;
