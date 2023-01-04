import { useEffect, useRef } from 'react';

const GoogleAdSenseHResponsiveImageV1 = () => {
	const configRef = useRef({
		retryCounter: 0,
		maxRetries: 7,
		currentRetryInterval: 1000,
		retryIntervalArr: [4000, 3000, 5000, 7000, 1000]
	});
	useEffect(() => {
		const pushAd = () => {
			try {
				const adsbygoogle = (window as any).adsbygoogle;
				console.log({ adsbygoogle });
				adsbygoogle.push({});
			} catch (e) {
				console.error(e);
			}
		};

		configRef.current.currentRetryInterval =
			configRef.current.retryIntervalArr[configRef.current.retryCounter] ||
			Math.ceil(configRef.current.currentRetryInterval * 1.5);

		const currentRetryInterval = configRef.current.currentRetryInterval;

		const interval = setInterval(() => {
			// Check if Adsense script is loaded every 300ms
			if ((window as any).adsbygoogle) {
				pushAd();
				configRef.current.retryCounter++;
				// clear the interval once the ad is pushed so that function isn't called indefinitely
				clearInterval(interval);
			}

			if (configRef.current) clearInterval(interval);
		}, currentRetryInterval);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		return () => {
			configRef.current = {
				retryCounter: 0,
				maxRetries: 7,
				currentRetryInterval: 1000,
				retryIntervalArr: [1000, 3000, 5000, 7000, 1000]
			};
		};
	}, []);

	return (
		<ins
			className='adsbygoogle'
			style={{ display: 'block' }}
			data-ad-client='ca-pub-8030984398568253'
			data-ad-slot='3437464395'
			data-ad-format='auto'
			data-full-width-responsive='true'
		></ins>
	);
};

export default GoogleAdSenseHResponsiveImageV1;
