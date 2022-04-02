import { NextPage } from 'next';
import Link from 'next/link';

import helpersClasses from '@styles/helpers.module.css';
import { NextSeo } from 'next-seo';

interface Props {}

const Tools: NextPage<Props> = () => {
	return (
		<>
			<NextSeo
				title='Useful Developer tools | LogNMaze'
				description='Useful tools to help developer productivity like md to html Convertor'
				canonical='https://lognmaze.com/tools'
				openGraph={{
					title: 'Useful Developer tools | LogNMaze',
					description:
						'Useful tools to help developer productivity like md to html Convertor',
				}}
			/>
			<main className={helpersClasses.main}>
				<ul>
					<li>
						<Link href='tools/convert_from_markdown_to_html' prefetch={false}>
							Convert From Markdown To HTML
						</Link>
					</li>
				</ul>
			</main>
		</>
	);
};

export default Tools;
