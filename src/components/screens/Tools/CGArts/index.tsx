import cgArtsTools from '@utils/core/appData/tools/cg-arts';
import Link from 'next/link';
import ToolSEOTags from '@components/screens/Tools/components/ToolSEOTags';

const CGArtsToolsScreen = () => {
	return (
		<>
			<ToolSEOTags data={cgArtsTools} />
			<section className='section-p'>
				<ul>
					{cgArtsTools.pages.map((page) => (
						<li key={page.relativePath}>
							<Link href={`/tools/cg-arts/${page.relativePath}`}>
								<p>{page.shortTitle}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
};

export default CGArtsToolsScreen;
