const title = 'LogNMaze | Create blogs using Markdown and share to the world';
const description =
	'Create blogs in Markdown and share them in your different social media platform';
const url = 'https://lognmaze.com/';

const DefaultSEOProps = {
	title,
	description,
	index: true,
	follow: true,
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'Mazen Mohamed Shaban',
		},
		{
			name: 'application-name',
			content: 'LogNMaze',
		},
		{
			httpEquiv: 'X-UA-Compatible',
			content: 'IE=edge; chrome=1',
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0',
		},
	],
	openGraph: {
		title,
		description,
		type: 'website',
		locale: 'en_IE',
		url,
		site_name: 'LogNMaze',
		description: '',
	},
	twitter: {
		handle: '@MazenMohamedSh4',
		site: '@MazenMohamedSh4',
		cardType: 'summary_large_image',
	},
};

export default DefaultSEOProps;
