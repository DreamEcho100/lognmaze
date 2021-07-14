import Md from './Format/Md/Md';
import Article from './type/Article/Article';
import Post from './type/Post/Post';

import classes from './Details.module.css';

const Details = ({ data }) => {
	// const { content = '', type = '' } = news;

	if (data.type === 'article') return <Article data={data} />;

	if (data.type === 'post') return <Post data={data} />;
};

export default Details;
