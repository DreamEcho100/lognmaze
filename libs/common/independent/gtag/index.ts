export const GA_TRACKING_ID = 'G-GYB2QBYV0D'; // process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

export const event = ({
	action,
	params,
}: {
	action: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: { [key: string]: any };
}) => {
	window.gtag('event', action, params);
};
