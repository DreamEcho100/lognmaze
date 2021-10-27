const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const obj = (phase) => {
	let env = {};

	if (phase === PHASE_DEVELOPMENT_SERVER) {
		env = {
			// MONGODB_USERNAME: process.env.MONGODB_DEVELOPMENT_USERNAME, // 'maximilian',
			// MONGODB_PASSWORD: process.env.MONGODB_DEVELOPMENT_PASSWORD, // '2YkcXq43KyPk0vqp',
			// MONGODB_CLUSTERNAME: process.env.MONGODB_DEVELOPMENT_CLUSTERNAME, // 'cluster0',
			// MONGODB_MAZENEXTBLOG_DATABASE: process.env.MONGODB_DEVELOPMENT_DATABASE, // 'my-site-dev',
			FRONT_END_ROOT_URL: 'http://localhost:3000', // baseUrl, // process.env.DEVELOPMENT_FRONT_END_ROOT_URL,
			BACK_END_ROOT_URL: 'http://localhost:3000', // baseUrl, // process.env.DEVELOPMENT_BACK_END_ROOT_URL,
			FRONT_END_DOMAIN: 'localhost', // baseUrl, // process.env.DEVELOPMENT_FRONT_END_DOMAIN,
			PG_CONNECTION_STRING:
				process.env.DEVELOPMENT_PG_SUPABASE_CONNECTION_STRING,
		};
	} else {
		//  process.env.VERCEL_URL
		// 	? `https://${process.env.VERCEL_URL}`
		// 	: 'https://lognmaze.com',
		// MONGODB_USERNAME: process.env.MONGODB_PRODUCTION_USERNAME,
		// MONGODB_PASSWORD: process.env.MONGODB_PRODUCTION_PASSWORD,
		// MONGODB_CLUSTERNAME: process.env.MONGODB_PRODUCTION_CLUSTERNAME,
		// MONGODB_MAZENEXTBLOG_DATABASE: process.env.MONGODB_PRODUCTION_DATABASE,
		env = {
			FRONT_END_ROOT_URL: 'https://lognmaze.com',
			BACK_END_ROOT_URL: 'https://lognmaze.com',
			FRONT_END_DOMAIN: 'lognmaze.com',
			PG_CONNECTION_STRING:
				process.env.PRODUCTION_PG_SUPABASE_CONNECTION_STRING,
		};
	}

	env = {
		...env,
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
		LOGNMAZE_SITEMAP_TOKEN: process.env.LOGNMAZE_SITEMAP_TOKEN,
	};

	return {
		// images: {
		// 	domains: [
		// 		'external-content.duckduckgo.com',
		// 		'miro.medium.com',
		// 		'*',
		// 		'*.com',
		// 	],
		// 	deviceSizes: [400, 800, 1200, 1600, 2000], // [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
		// },
		env,
		eslint: {
			// Warning: This allows production builds to successfully complete even if
			// your project has ESLint errors.
			ignoreDuringBuilds: true,
		},
		experimental: {
			esmExternals: true,
		},
	};
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer([withPlugins], obj);
// module.exports = withBundleAnalyzer(obj);
module.exports = obj;
