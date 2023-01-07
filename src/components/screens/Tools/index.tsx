import toolsData from '@utils/core/appData/tools';
import ToolSEOTags from '@components/screens/Tools/components/ToolSEOTags';
import Link from 'next/link';
import FAQs from './components/FAQs';

const ToolsScreen = () => {
	return (
		<>
			<ToolSEOTags data={toolsData} />
			<section className='section-p'>
				<ul>
					{toolsData.pages.map((page) => (
						<li key={page.relativePath}>
							<Link href={`/${toolsData.relativePath}/${page.relativePath}`}>
								<p>{page.shortTitle}</p>
							</Link>
							<ul>
								{page.pages.map((subPage) => (
									<li key={subPage.relativePath}>
										<Link
											href={`/${toolsData.relativePath}/${page.relativePath}/${subPage.relativePath}`}
										>
											<p>{subPage.shortTitle}</p>
										</Link>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
				<FAQs faqs={toolsData.faqs} />
			</section>
		</>
	);
};

export default ToolsScreen;
