import { useEffect, useState } from 'react';

import NewsHeader from '../Header/Header';
import Details from '../Details/Details';

const Container = ({ data }) => {
	return (
		<article>
			<NewsHeader data={data} />
			<Details data={data} />
		</article>
	);
};

export default Container;
