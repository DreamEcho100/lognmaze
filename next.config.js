const path = require('path');
// const Dotenv = require('dotenv-webpack');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// const withPlugins = require("next-compose-plugins");
// const withTypescript = require('@zeit/next-typescript');
// const withSass = require('@zeit/next-sass');

// module.exports = withPlugins(
//    [
//       withTypescript,
//       withSass
//    ],
//    { /* nextConfig options here */ }
// );

module.exports = (phase) => {
	let env = {};
	// const baseUrl = `${
	// 	process.env.NODE_ENV !== 'production' ? 'http' : 'https'
	// }://${ctx.req.headers.host}`;

	if (phase === PHASE_DEVELOPMENT_SERVER) {
		env = {
			// MONGODB_USERNAME: process.env.MONGODB_DEVELOPMENT_USERNAME, // 'maximilian',
			// MONGODB_PASSWORD: process.env.MONGODB_DEVELOPMENT_PASSWORD, // '2YkcXq43KyPk0vqp',
			// MONGODB_CLUSTERNAME: process.env.MONGODB_DEVELOPMENT_CLUSTERNAME, // 'cluster0',
			// MONGODB_MAZENEXTBLOG_DATABASE: process.env.MONGODB_DEVELOPMENT_DATABASE, // 'my-site-dev',
			FRONT_END_ROOT_URL: 'http://localhost:3000', // baseUrl, // process.env.DEVELOPMENT_FRONT_END_ROOT_URL,
			BACK_END_ROOT_URL: 'http://localhost:3000', // baseUrl, // process.env.DEVELOPMENT_BACK_END_ROOT_URL,
			FRONT_END_DOMAIN: 'http://localhost:3000', // baseUrl, // process.env.DEVELOPMENT_FRONT_END_DOMAIN,
			PG_CONNECTION_STRING: process.env.DEVELOPMENT_PG_CONNECTION_STRING,
		};
	} else {
		env = {
			// MONGODB_USERNAME: process.env.MONGODB_PRODUCTION_USERNAME,
			// MONGODB_PASSWORD: process.env.MONGODB_PRODUCTION_PASSWORD,
			// MONGODB_CLUSTERNAME: process.env.MONGODB_PRODUCTION_CLUSTERNAME,
			// MONGODB_MAZENEXTBLOG_DATABASE: process.env.MONGODB_PRODUCTION_DATABASE,
			FRONT_END_ROOT_URL: 'https://brodevlog.vercel.app', // baseUrl, // process.env.PRODUCTION_FRONT_END_ROOT_URL,
			BACK_END_ROOT_URL: 'https://brodevlog.vercel.app', // baseUrl, // process.env.PRODUCTION_BACK_END_ROOT_URL,
			FRONT_END_DOMAIN: 'https://brodevlog.vercel.app', // baseUrl, // process.env.PRODUCTION_FRONT_END_DOMAIN,
			PG_CONNECTION_STRING: process.env.PRODUCTION_PG_CONNECTION_STRING,
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
	};

	return {
		images: {
			domains: [
				'external-content.duckduckgo.com',
				'miro.medium.com',
				'*',
				'*.com',
			],
			deviceSizes: [400, 800, 1200, 1600, 2000], // [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
		},
		sassOptions: {
			includePaths: [path.join(__dirname, 'styles')],
		},
		webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
			config.resolve.alias['@'] = path.resolve(__dirname);
			// config.plugins.push(new Dotenv({ silent: true }));

			// if (config.mode === 'production') {
			// 	if (Array.isArray(config.optimization.minimizer)) {
			// 		config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
			// 	}
			// }
			return config;
		},
		env,
		// plugins: ['babel-plugin-emotion'],
		// exportPathMap: async function() {
		// 	const paths = {
		// 		'/': { page: '/' }
		// 	};
		// 	return paths;
		// }
	};
};
