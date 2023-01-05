import type { SoftwareApplication, WebPage } from 'schema-dts';

import { jsonLdScriptProps } from 'react-schemaorg';
import Head from 'next/head';
import { useGetFullURLPathName } from '@components/shared/common/hooks';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';

export type ToolSEOTagsProps = {
	data: {
		title: string;
		description: string;
		faqs: { question: string; answer: string }[];
		tags: string[];
	};
};

const ToolSEOTags = ({ data }: ToolSEOTagsProps) => {
	const fullURLPathName = useGetFullURLPathName();

	return (
		<>
			<Head>
				<script
					id='WebApplicationWithAggregateRatingAndFAQs'
					{...jsonLdScriptProps<SoftwareApplication>({
						'@context': 'https://schema.org',
						'@id': fullURLPathName,
						'@type': 'WebApplication',
						name: data.title,
						description: data.description,
						applicationCategory: 'UtilitiesApplication',
						keywords: data.tags.map((tag) => tag).join(','),
						operatingSystem: 'any',
						mainEntity: [
							{
								'@type': 'FAQPage',
								'@id': `${fullURLPathName}/#faqs`,
								name: `FAQs | ${data.title}`,
								description: `FAQs | ${data.description}`,
								keywords: data.tags.map((tag) => tag).join(','),
								mainEntity: data.faqs.map((faq) => ({
									'@type': 'Question',
									name: faq.question,
									acceptedAnswer: { '@type': 'Answer', text: faq.answer }
								}))
							},
							{
								'@type': 'AggregateRating',
								'@id': `${fullURLPathName}/#aggregate-rating`,
								name: `Aggregate Rating | ${data.title}`,
								ratingCount: 1,
								ratingValue: 5,
								reviewCount: 0,
								itemReviewed: {
									'@type': 'WebApplication',
									'@id': fullURLPathName
								}
							},
							{
								'@type': 'UnitPriceSpecification',
								'@id': `${fullURLPathName}/#price`,
								price: 0,
								priceCurrency: 'USD'
							}
						]
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
