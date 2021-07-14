import React, { useContext, useEffect, useState } from 'react';
// import Image from 'next/image';

// import classes from './Header.module.css';

import UserContext from '@/store/UserContext';

import Settings from './Settings/Settings';
import Article from './type/Article/Article';
import Post from './type/Post/Post';

const Header = (porps) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [isDataOwner, setIsDataOwner] = useState(false);
	const [data, setData] = useState(porps.data);

	useEffect(() => {
		if (user && user.user_name_id === data.author_user_name_id) {
			setIsDataOwner(true);
		} else if (isDataOwner) {
			setIsDataOwner(false);
		}
	}, [user]);

	if (data.type === 'article')
		return (
			<Article
				user={user}
				data={data}
				Settings={() => (
					<Settings isDataOwner={isDataOwner} data={data} setData={setData} />
				)}
			/>
		);

	if (data.type === 'post')
		return (
			<Post
				user={user}
				data={data}
				Settings={() => (
					<Settings isDataOwner={isDataOwner} data={data} setData={setData} />
				)}
			/>
		);
};

export default Header;
