/** @type {import('next').NextConfig} */
/*
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
*/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
	let env = {
		JWT_SECRET: process.env.JWT_SECRET,
		CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
		CLOUDINARY_API_ENVIROMENT_VARIABLE:
			process.env.CLOUDINARY_API_ENVIROMENT_VARIABLE,
		CLOUDINARY_UPLOAD_PRESET_KEY: process.env.CLOUDINARY_UPLOAD_PRESET_KEY,
		UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_API_TOKEN:
			process.env.UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_API_TOKEN,
		UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_USER_EMAIL:
			process.env.UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_USER_EMAIL,
		LOGNMAZE_SITEMAP_TOKEN: process.env.LOGNMAZE_SITEMAP_TOKEN
	};

	if (phase === PHASE_DEVELOPMENT_SERVER) {
		env = {
			...env,
			FRONT_END_ROOT_URL: 'http://localhost:3000',
			BACK_END_ROOT_URL: 'http://localhost:3000',
			FRONT_END_DOMAIN: 'localhost',
			PG_CONNECTION_STRING:
				process.env.DEVELOPMENT_PG_LOCALHOST_CONNECTION_STRING,
			UPSTASH_REST_API_DOMAIN: process.env.UPSTASH_REST_API_DOMAIN,
			UPSTASH_REST_API_TOKEN: process.env.UPSTASH_REST_API_TOKEN
		};
	} else {
		//  process.env.VERCEL_URL
		// 	? `https://${process.env.VERCEL_URL}`
		// 	: 'https://lognmaze.com',
		env = {
			...env,
			FRONT_END_ROOT_URL: 'https://lognmaze.com',
			BACK_END_ROOT_URL: 'https://lognmaze.com',
			FRONT_END_DOMAIN: 'lognmaze.com',
			PG_CONNECTION_STRING:
				process.env.PRODUCTION_PG_SUPABASE_CONNECTION_STRING,
			UPSTASH_REST_API_DOMAIN: process.env.UPSTASH_REST_API_DOMAIN,
			UPSTASH_REST_API_TOKEN: process.env.UPSTASH_REST_API_TOKEN
		};
	}

	return {
		// images: {
		// 	// domains: [
		// 	// 	'external-content.duckduckgo.com',
		// 	// 	'miro.medium.com',
		// 	// 	'*',
		// 	// 	'*.com',
		// 	// ],
		// 	// deviceSizes: [400, 800, 1200, 1600, 2000], // [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
		// 	allowFutureImage: true,
		// },
		env,
		eslint: {
			// Warning: This allows production builds to successfully complete even if
			// your project has ESLint errors.
			ignoreDuringBuilds: true
		},
		swcMinify: true,
		compiler: {
			removeConsole:
				process.env.NODE_ENV === 'production'
					? { exclude: ['error', 'warn'] }
					: false
		}
	};
};

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer([withPlugins], nextConfig);
// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
