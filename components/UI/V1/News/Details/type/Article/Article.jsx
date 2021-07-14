import Link from 'next/link';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// import Md from '../../Format/Md/Md';

import classes from './Article.module.css';

const Article = ({ data }) => {
	// const router = useRouter();

	// <Link href={`/profile/${data.author_user_name_id}`}>
	// 	<a target='_blank' target='_blank' rel='noopener noreferrer'>
	// 	</a>
	// </Link>
	return (
		<section>
			{/* {data.format_type === 'md' ? (
				<Md content={data.content} />
			) : (
				<p>{data.content}</p>
			)} */}
			<p>{data.description}</p>
		</section>
	);
};

export default Article;
