import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const initConfigRef = () => ({
	retryCounter: 0,
	maxRetries: 7,
	interval: 1000
});

const GoogleAdSenseHResponsiveImageV1 = () => {
	const router = useRouter();
	const configRef = useRef(initConfigRef());
	useEffect(() => {
		if (!router.isReady || process.env.NODE_ENV !== 'production') return;

		const pushAd = () => {
			try {
				if (!(window as any).adsbygoogle)
					throw new Error("Can't find adsbygoogle");
				const adsbygoogle = (window as any).adsbygoogle;
				adsbygoogle.push({});
				return true;
			} catch (e) {
				console.warn(e);

				return false;
			}
		};

		if (pushAd()) return;

		let rePushTimeoutId: NodeJS.Timeout;

		const rePushTimeout = () => {
			rePushTimeoutId = setInterval(() => {
				if (
					configRef.current.maxRetries === configRef.current.retryCounter ||
					pushAd()
				)
					return clearInterval(rePushTimeoutId);
			}, configRef.current.interval);
		};

		rePushTimeout();

		return () => {
			clearInterval(rePushTimeoutId);
		};
	}, [router.isReady]);

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
