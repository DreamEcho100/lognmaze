import { useEffect, useState } from 'react';

import SocialMediaLinksData from './SocialMediaLinksData/index';

const SocialMediaShareLink = ({
	children,
	type,
	title = '',
	useEffectDependencyList = [],
	anchorExtraProps = {},
	...props
}) => {
	const [anchorProps, setAnchorProps] = useState(anchorExtraProps);

	useEffect(() => {
		const { link, linkPrams } = SocialMediaLinksData(props)[type];

		const linkPramsArr = [];

		let linkPram;
		for (linkPram in linkPrams) {
			if (linkPrams[linkPram]) {
				linkPramsArr.push(
					`${encodeURIComponent(linkPram)}=${encodeURIComponent(
						linkPrams[linkPram]
					)}`
				);
			}
		}

		setAnchorProps((prev) => ({
			...prev,
			href: `${link}/?${linkPramsArr.join('&')}`,
			title,
		}));
	}, useEffectDependencyList);

	return (
		<a {...anchorProps} target='_blank' rel='noopener noreferrer'>
			{children}
		</a>
	);
};

export default SocialMediaShareLink;
