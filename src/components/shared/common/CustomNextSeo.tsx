import type { NextSeoProps } from 'next-seo';

import { NextSeo } from 'next-seo';
import { useGetFullURLPathName } from './hooks';

const CustomNextSeo = ({
	pageTitle,
	pageDescription,
	canonical: _canonical,
	openGraph,
	twitter,
	...props
}: Omit<NextSeoProps, 'canonical'> & {
	pageTitle?: string;
	pageDescription?: string;
	canonical?: string | false;
}) => {
	const fullPathName = useGetFullURLPathName();
	const canonical =
		typeof _canonical === 'boolean' && !_canonical
			? undefined
			: typeof _canonical === 'string'
			? _canonical
			: fullPathName;

	return (
		<NextSeo
			title={pageTitle}
			description={pageDescription}
			canonical={canonical}
			twitter={{ handle: pageTitle, ...twitter }}
			openGraph={{
				title: pageTitle,
				description: pageDescription,
				...openGraph
			}}
			{...props}
		/>
	);
};

export default CustomNextSeo;
