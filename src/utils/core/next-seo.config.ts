import type { DefaultSeoProps } from 'next-seo';
import {
	websiteBasePath,
	defaultDescription,
	defaultTitle,
	defaultSiteName
} from './app';

const NextSEODefaults: DefaultSeoProps = {
	canonical: websiteBasePath,
	description: defaultDescription,
	title: defaultTitle,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		site_name: defaultSiteName,
		url: websiteBasePath,
		description: defaultDescription,
		title: defaultTitle,
		images: [
			{
				url: `${websiteBasePath}/favicon.ico`,
				width: 250,
				height: 250,
				alt: `${defaultSiteName} Logo`
			}
		]
	},
	twitter: {
		handle: '@MazenMohamedSh4',
		site: '@LogNMaze',
		cardType: 'summary_large_image'
	},
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'Mazen Mohamed'
		},
		{
			name: 'application-name',
			content: 'LogNMaze'
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge, chrome=1'
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0'
		},
		{
			name: 'color-scheme',
			content: 'dark light'
		}
	]
};

export default NextSEODefaults;
