import { useEffect, useRef } from 'react';

const initConfigRef = () => ({
	retryCounter: 0,
	maxRetries: 7,
	currentRetryInterval: 4000,
	retryIntervalArr: [4000, 3000, 5000, 7000, 10000]
});

const GoogleAdSenseHResponsiveImageV1 = () => {
	const configRef = useRef(initConfigRef());
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') return;

		const pushAd = () => {
			try {
				if (!(window as any).adsbygoogle)
					throw new Error("Can't find adsbygoogle");
				const adsbygoogle = (window as any).adsbygoogle;
				console.log({ adsbygoogle });
				adsbygoogle.push({});
				return true;
			} catch (e) {
				console.error(e);

				configRef.current.retryCounter++;

				configRef.current.currentRetryInterval =
					configRef.current.retryIntervalArr[configRef.current.retryCounter] ||
					Math.ceil(configRef.current.currentRetryInterval * 1.5);

				return false;
			}
		};

		if (pushAd()) return;

		let rePushTimeoutId: NodeJS.Timeout;

		const rePushTimeout = () => {
			clearTimeout(rePushTimeoutId);

			rePushTimeoutId = setTimeout(() => {
				if (
					configRef.current.maxRetries === configRef.current.retryCounter ||
					pushAd()
				)
					return;

				rePushTimeout();
			}, configRef.current.currentRetryInterval);
		};

		rePushTimeout();

		return () => {
			clearTimeout(rePushTimeoutId);
		};
	}, []);

	useEffect(() => {
		return () => {
			configRef.current = initConfigRef();
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
