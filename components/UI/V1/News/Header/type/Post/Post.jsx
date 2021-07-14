import Link from 'next/link';

import classes from './Post.module.css';

const Post = ({ data, Settings }) => {
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
				<div className=''>
					<p>Created At: {data.created_at}</p>
					{data.updated_on !== data.created_at ? (
						<p>Updated On: {data.updated_on}</p>
					) : null}
				</div>
				<Settings />
			</nav>
		</header>
	);
};

export default Post;
