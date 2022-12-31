import toolsData from '@utils/core/appData/tools';
import Link from 'next/link';

const ToolsScreen = () => {
	return (
		<section>
			<ul>
				{toolsData.pages.map((page) => (
					<li key={page.relativePath}>
						<Link href={`${toolsData.basePath}/${page.relativePath}`}>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ToolsScreen;
