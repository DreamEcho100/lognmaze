export const GA_TRACKING_ID = 'G-GYB2QBYV0D'; // process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
	// if (window.gtag)
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({
// 	action,
// 	category,
// 	label,
// 	value,
// }: {
// 	action: string;
// 	category: string;
// 	label: string;
// 	value: string;
// }) => {
// 	// if (window.gtag)
// 	window.gtag('event', action, {
// 		event_category: category,
// 		event_label: label,
// 		value: value,
// 	});
// };
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
