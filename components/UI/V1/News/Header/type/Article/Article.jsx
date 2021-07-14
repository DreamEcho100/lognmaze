import Link from 'next/link';
import { useRouter } from 'next/router';
// import Image from 'next/image';

import classes from './Article.module.css';

const Article = ({ data, Settings }) => {
	const router = useRouter();

	return (
		<header>
			<nav>
				{/*<p>{data.author_id}</p>*/}
				<Link href={`/profile/${data.author_user_name_id}`}>
					<a target='_blank' target='_blank' rel='noopener noreferrer'>
						<img
							src={data.author_profile_picture}
							alt=''
							style={{ width: '6rem', height: '6rem' }}
							loading='lazy'
						/>
						{data.author_first_name} {data.author_last_name}
					</a>
				</Link>
				<Settings />
			</nav>
			<section>
				<div className=''>
					<p>Created At: {data.created_at}</p>
					{data.updated_on !== data.created_at ? (
						<p>Updated On: {data.updated_on}</p>
					) : null}
				</div>
				<div className=''>
					{!router.query.slug && data.type === 'article' ? (
						<Link href={`/article/${data.slug}`}>
							<a target='_blank' rel='noopener noreferrer'>
								<h1>{data.title}</h1>
							</a>
						</Link>
					) : (
						<h1>{data.title}</h1>
					)}
					<img
						src={data.image}
						alt=''
						style={{ width: '100%' }}
						loading='lazy'
					/>
					<p>
						<strong>Tags:</strong> {data.tags.join(', ')}
					</p>
				</div>
			</section>
		</header>
	);
};

export default Article;
