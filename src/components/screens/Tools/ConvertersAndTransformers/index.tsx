import convertersAndTransformersTools from '@utils/core/appData/tools/converters-and-transformers';
import Link from 'next/link';
import ToolSEOTags from '@components/screens/Tools/components/ToolSEOTags';
import FAQs from '../components/FAQs';

const ConvertersAndTransformersToolsScreen = () => {
	return (
		<>
			<ToolSEOTags data={convertersAndTransformersTools} />
			<section className='section-p'>
				<ul>
					{convertersAndTransformersTools.pages.map((page) => (
						<li key={page.relativePath}>
							<Link href={`/tools/${page.relativePath}/${page.relativePath}`}>
								<p>{page.shortTitle}</p>
							</Link>
						</li>
					))}
				</ul>
				<FAQs faqs={convertersAndTransformersTools.faqs} />
			</section>
		</>
	);
};

export default ConvertersAndTransformersToolsScreen;
