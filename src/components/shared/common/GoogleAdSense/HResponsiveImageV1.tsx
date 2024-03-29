import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Router from 'next/router';

const initConfigRef = () => ({
	retryCounter: 0,
	interval: 1000
});

const GoogleAdSenseHResponsiveImageV1Item = () => {
	const router = useRouter();
	const configRef = useRef(initConfigRef());
	useEffect(() => {
		if (!router.isReady || process.env.NODE_ENV !== 'production') return;

		const pushAd = () => {
			try {
				if (
					!(window as unknown as { adsbygoogle: Record<string, unknown>[] })
						.adsbygoogle
				)
					throw new Error("Can't find adsbygoogle");
				const adsbygoogle = (
					window as unknown as { adsbygoogle: Record<string, unknown>[] }
				).adsbygoogle;
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
				configRef.current.retryCounter++;
				if (pushAd()) return clearInterval(rePushTimeoutId);
			}, configRef.current.interval);
		};

		rePushTimeout();

		return () => clearInterval(rePushTimeoutId);
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

const GoogleAdSenseHResponsiveImageV1 = () => {
	const [, setCounter] = useState(0);

	useEffect(() => {
		const bumpCounter = () => setCounter((prev) => prev + 1);

		Router.events.on('routeChangeComplete', bumpCounter);

		return () => Router.events.on('routeChangeComplete', bumpCounter);
	}, []);

	return <GoogleAdSenseHResponsiveImageV1Item />;
};

export default GoogleAdSenseHResponsiveImageV1;
