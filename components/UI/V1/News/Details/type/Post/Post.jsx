import Link from 'next/link';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

import classes from './Post.module.css';

const Post = ({ data }) => {
	// const router = useRouter();

	// <Link href={`/profile/${data.author_user_name_id}`}>
	// 	<a target='_blank' target='_blank' rel='noopener noreferrer'>
	// 	</a>
	// </Link>
	return (
		<section>
			<p>{data.content}</p>
		</section>
	);
};

export default Post;
