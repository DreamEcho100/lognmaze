// const mergeForTitle = (text) => text.join(' - ');

const isMobileOrTablet = () =>
	/(android|iphone|ipad|mobile)/i.test(navigator.userAgent);

const SocialMediaLinksData = (props = {}) => ({
	facebook: {
		link: 'https://www.facebook.com/sharer/sharer.php',
		linkPrams: {
			u: props.url,
			quote: props.quote || props.title,
			hashtag:
				props.hashtag && props.hashtag.length > 0
					? `#${props.hashtag[0]}` // `#${props.hashtag.join('#')}`
					: undefined,
		},
	},
	linkedin: {
		link: 'https://www.linkedin.com/sharing/share-offsite',
		linkPrams: {
			url: props.url,
			mini: 'true',
			title: props.title,
			summary: props.summary,
			source: props.source,
		},
	},
	reddit: {
		link: 'https://www.reddit.com/submit',
		linkPrams: {
			url: props.url,
			title: props.title,
		},
	},
	telegram: {
		link: 'https://telegram.me/share/',
		linkPrams: {
			url: props.url,
			text: props.title,
		},
	},
	tumblr: {
		link: 'https://www.tumblr.com/widgets/share/tool',
		linkPrams: {
			canonicalUrl: props.url,
			title: props.title,
			caption: props.caption,
			tags: (props.tags || []).join(','),
			posttype: props.posttype || 'link',
		},
	},
	twitter: {
		link: 'https://twitter.com/share',
		linkPrams: {
			url: props.url,
			text: props.title,
			via: props.via,
			hashtags:
				props.hashtags && props.hashtags.length > 0
					? props.hashtags.join(',')
					: undefined,
			related:
				props.related && props.related.length > 0
					? props.related.join(',')
					: undefined,
		},
	},
	viber: {
		link: 'viber://forward',
		linkPrams: {
			title: props.title
				? props.title + (props.separator || ' ') + props.url
				: props.url,
		},
	},
	whatsapp: {
		link:
			'https://' + (isMobileOrTablet() ? 'api' : 'web') + '.whatsapp.com/send',
		linkPrams: {
			text: props.title
				? props.title + (props.separator || ' ') + props.url
				: props.url,
		},
	},
	/*
	'': {
		link: 'https://www.',
		linkPrams: {
			url: props.url,
			title: props.title,
		},
	},
  */
});

export default SocialMediaLinksData;
