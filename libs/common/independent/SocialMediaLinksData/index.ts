// const mergeForTitle = (text) => text.join(' - ');

const isMobileOrTablet = () =>
	/(android|iphone|ipad|mobile)/i.test(navigator.userAgent);

interface ISocialMediaTypeFacebook {
	socialMediaType: 'facebook';
	url: string;
	quote?: string;
	title?: string;
	hashtag?: string[];
}
interface ISocialMediaTypeLinkedin {
	socialMediaType: 'linkedin';
	url: string;
	summary: string;
	title: string;
	source: string;
}
interface ISocialMediaTypeReddit {
	socialMediaType: 'reddit';
	url: string;
	title: string;
}
interface ISocialMediaTypeTelegram {
	socialMediaType: 'telegram';
	url: string;
	title: string; // text
}
interface ISocialMediaTypeTumblr {
	socialMediaType: 'tumblr';
	url: string; // canonicalUrl
	title: string;
	caption: string;
	tags?: string[];
	posttype?: string | 'link';
}
interface ISocialMediaTypeTwitter {
	socialMediaType: 'twitter';
	url: string;
	title: string; // text
	via?: string;
	hashtags?: string[];
	related?: string[];
}
interface ISocialMediaTypeViber {
	socialMediaType: 'viber';
	title: string;
}
interface ISocialMediaTypeWhatsapp {
	socialMediaType: 'whatsapp';
	url: string;
	title?: string;
	separator?: string;
}

type TProps =
	| ISocialMediaTypeFacebook
	| ISocialMediaTypeLinkedin
	| ISocialMediaTypeReddit
	| ISocialMediaTypeTelegram
	| ISocialMediaTypeTumblr
	| ISocialMediaTypeTwitter
	| ISocialMediaTypeViber
	| ISocialMediaTypeWhatsapp;

const SocialMediaLinksData = (props: TProps) => {
	switch (props.socialMediaType) {
		case 'facebook': {
			return {
				link: 'https://www.facebook.com/sharer/sharer.php',
				linkPrams: {
					u: props.url,
					quote: props.quote || props.title,
					hashtag:
						props?.hashtag &&
						props.hashtag.length > 0 &&
						`#${props.hashtag[0]}`,
				},
			};
		}
		case 'linkedin': {
			return {
				link: 'https://www.linkedin.com/sharing/share-offsite',
				linkPrams: {
					url: props.url,
					mini: 'true',
					title: props.title,
					summary: props.summary,
					source: props.source,
				},
			};
		}
		case 'reddit': {
			return {
				link: 'https://www.reddit.com/submit',
				linkPrams: {
					url: props.url,
					title: props.title,
				},
			};
		}
		case 'telegram': {
			return {
				link: 'https://telegram.me/share/',
				linkPrams: {
					url: props.url,
					text: props.title,
				},
			};
		}
		case 'tumblr': {
			return {
				link: 'https://www.tumblr.com/widgets/share/tool',
				linkPrams: {
					canonicalUrl: props.url,
					title: props.title,
					caption: props.caption,
					tags: (props.tags || []).join(','),
					posttype: props.posttype || 'link',
				},
			};
		}
		case 'twitter': {
			return {
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
			};
		}
		case 'viber': {
			return {
				link: 'https://www.reddit.com/submit',
				linkPrams: {
					title: props.title,
				},
			};
		}
		case 'whatsapp': {
			return {
				link:
					'https://' +
					(isMobileOrTablet() ? 'api' : 'web') +
					'.whatsapp.com/send',
				linkPrams: {
					text: props.title
						? props.title + (props.separator || ' ') + props.url
						: props.url,
				},
			};
		}

		default:
			break;
	}
};

export default SocialMediaLinksData;
