import { env } from '@env/client.mjs';

export const websiteBasePath =
	process.env.NODE_ENV === 'production'
		? `https://${env.NEXT_PUBLIC_APP_DOMAIN}`
		: 'http://localhost:3000';
export const defaultSiteName = 'LogNMaze';
export const defaultTitle = `${defaultSiteName} | Create blogs and posts in Markdown and share them in your different social media platform`;
export const defaultDescription =
	'Create blogs and posts in Markdown and share them in your different social media platform';
