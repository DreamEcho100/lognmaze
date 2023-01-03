import type { NextPage } from 'next';

import CreativeWorksFeed from '@components/shared/core/CreativeWorks/Feed';
import { useTypedSession } from '@utils/common/hooks';
import { CreativeWorkType } from '@prisma/client';

const Home: NextPage = () => {
	const { data: session, status } = useTypedSession();

	return (
		<section className='section-p'>
			<div className='md:w-3/5'>
				<CreativeWorksFeed
					getAllCreativeWorksInput={{
						authorId: session?.user.id,
						checkForPrivileges: status === 'authenticated',
						type: [CreativeWorkType.BLOG_POST]
					}}
				/>
			</div>
		</section>
	);
};

export default Home;
