import toolsData from '@utils/core/appData/tools';
import Link from 'next/link';

const ToolsScreen = () => {
	return (
		<section className='section-p'>
			<ul>
				{toolsData.pages.map((page) => (
					<li key={page.relativePath}>
						<Link href={`${toolsData.basePath}/${page.relativePath}`}>
							{page.shortTitle}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ToolsScreen;
