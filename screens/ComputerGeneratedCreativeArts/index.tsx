import { NextSeo } from 'next-seo';
import Link from 'next/link';

import helpersClasses from '@styles/helpers.module.css';

const ComputerGeneratedCreativeArtsScreen = () => {
	return (
		<>
			<NextSeo
				title='Computer Generated Creative Arts | LogNMaze'
				description='Using different and complex algorithms to make a computer generated creative arts'
				canonical='https://lognmaze.com/cg_creative_arts'
				openGraph={{
					title: 'Computer Generated Creative Arts | LogNMaze',
					description:
						'Using different and complex algorithms to make a computer generated creative arts',
				}}
			/>
			<main className={helpersClasses.main}>
				<ul>
					<li>
						<Link href='cg_creative_arts/fractal_tree' prefetch={false}>
							Drawing Fractal Tree Animation
						</Link>
					</li>
				</ul>
			</main>
		</>
	);
	return (
		<main className={helpersClasses.main}>
			<section>ComputerGeneratedCreativeArtsScreen</section>
		</main>
	);
};

export default ComputerGeneratedCreativeArtsScreen;
