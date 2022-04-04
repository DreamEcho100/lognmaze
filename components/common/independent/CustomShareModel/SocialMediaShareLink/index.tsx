import { AnchorHTMLAttributes, ReactNode, useCallback, useEffect } from 'react';

import SocialMediaLinksData from '../../../../../libs/common/independent/SocialMediaLinksData';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	SocialMediaLinksDataProps: Parameters<typeof SocialMediaLinksData>['0'];
	children: ReactNode;
}

const SocialMediaShareLink = ({
	children,
	SocialMediaLinksDataProps,
	...props
}: IProps) => {
	const buildingAnchorLinkProps = useCallback(() => {
		const linkProps = SocialMediaLinksData(SocialMediaLinksDataProps);

		if (!linkProps) return;
		const { link, linkPrams } = linkProps;

		const linkPramsArr: string[] = [];

		let linkPram: keyof typeof linkPrams;
		for (linkPram in linkPrams) {
			let pram = linkPrams[linkPram];
			if (pram) {
				linkPramsArr.push(
					`${encodeURIComponent(linkPram)}=${encodeURIComponent(pram)}`
				);
			}
		}

		return `${link}/?${linkPramsArr.join('&')}`;
	}, [SocialMediaLinksDataProps]);

	const href = buildingAnchorLinkProps();

	useEffect(() => {
		buildingAnchorLinkProps();
	}, [buildingAnchorLinkProps]);

	return (
		<a {...props} href={href} target='_blank' rel='noopener noreferrer'>
			{children}
		</a>
	);
};

export default SocialMediaShareLink;
