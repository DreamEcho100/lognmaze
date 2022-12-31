import IETF_BCP_47_STANDARD from './appData/IETF_BCP_47_STANDARD';

export { default as IETF_BCP_47_STANDARD } from './appData/IETF_BCP_47_STANDARD';

export const LangsOptions = IETF_BCP_47_STANDARD.body.map((item) => ({
	children: `${item.code}-${item.countryCode}`.toUpperCase(),
	value: item.id,
	title: item.description
}));

const defaultLang = (() => {
	const defaultLang = IETF_BCP_47_STANDARD.body.find(
		(item) =>
			item.code.toLocaleLowerCase() === 'en' &&
			item.countryCode.toLocaleLowerCase() === 'us'
	);
	if (!defaultLang) throw new Error('Cannot find the default language');

	return defaultLang;
})();

export { defaultLang };
