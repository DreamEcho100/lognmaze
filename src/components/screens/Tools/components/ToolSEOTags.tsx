import type { WebPage } from 'schema-dts';

import { jsonLdScriptProps } from 'react-schemaorg';
import Head from 'next/head';
import { useGetFullURLPathName } from '@components/shared/common/hooks';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';

const ToolSEOTags = ({
	data
}: {
	data: {
		title: string;
		description: string;
		faqs: { question: string; answer: string }[];
		tags: string[];
	};
}) => {
	const fullURLPathName = useGetFullURLPathName();

	return (
		<>
			<Head>
				<script
					id='WebPageWithFAQs'
					{...jsonLdScriptProps<WebPage>({
						'@context': 'https://schema.org',
						'@id': fullURLPathName,
						'@type': 'WebPage',
						name: data.title,
						description: data.description,
						keywords: data.tags.map((tag) => tag).join(','),
						mainEntity: {
							'@type': 'FAQPage',
							mainEntity: data.faqs.map((faq) => ({
								'@type': 'Question',
								name: faq.question,
								acceptedAnswer: { '@type': 'Answer', text: faq.answer }
							}))
						}
					})}
				/>
			</Head>
			<CustomNextSeo
				pageTitle={data.title}
				pageDescription={data.description}
			/>
		</>
	);
};

export default ToolSEOTags;
