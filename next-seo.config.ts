import { DefaultSeoProps } from 'next-seo';

const SEODefaults: DefaultSeoProps = {
	canonical: 'https://lognmaze.com/',
	description:
		'Create blogs and posts in Markdown and share them in your different social media platform',
	title:
		'LogNMaze | Create blogs and posts in Markdown and share them in your different social media platform',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		site_name: 'LogNMaze',
		url: 'https://lognmaze.com/',
		description:
			'Create blogs and posts in Markdown and share them in your different social media platform',
		title:
			'LogNMaze | Create blogs and posts in Markdown and share them in your different social media platform',
	},
	twitter: {
		handle: '@MazenMohamedSh4',
		site: '@LogNMaze',
		// creator: '@MazenMohamedSh4',
		cardType: 'summary_large_image',
		// url: 'https://lognmaze.com/',
		// description: 'Create blogs and posts in Markdown and share them in your different social media platform',
		// title: 'Create blogs and posts in Markdown and share them in your different social media platform',
	},
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'Mazen Mohamed',
		},
		{
			name: 'application-name',
			content: 'LogNMaze',
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge; chrome=1',
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0',
		},
	],
};

export default SEODefaults;
