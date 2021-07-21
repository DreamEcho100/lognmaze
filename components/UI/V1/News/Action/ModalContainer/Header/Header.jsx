import { useEffect, useState } from 'react';

import classes from './Header.module.css';

import Button from '@components/UI/V1/Button/Button';

const Header = ({ news, newsType, setNewsType }) => {
	const [h2Text, setH2Text] = useState('');

	useEffect(() => {
		setH2Text(`
			Create ${
				['a', 'e', 'i', 'o', 'u'].some(
					(letter) => letter === newsType.substr(0, 1).toLowerCase()
				)
					? 'An'
					: 'A'
			} ${newsType.substr(0, 1).toUpperCase() + newsType.substr(1)}
		`);
	}, [newsType]);

	if (news.action === 'create') {
		return (
			<header>
				<h2>{h2Text}</h2>
				<nav className={classes.nav}>
					<ul className={classes.ul}>
						<li>
							<Button
								onClick={() => {
									if (newsType !== 'article') setNewsType('article');
								}}
							>
								Article
							</Button>
						</li>
						<li>
							<Button
								onClick={() => {
									if (newsType !== 'post') setNewsType('post');
								}}
							>
								Post
							</Button>
						</li>
					</ul>
				</nav>
			</header>
		);
	}

	if (news.action === 'update') {
		return (
			<h2>
				Update{' '}
				{['a', 'e', 'i', 'o', 'u'].some(
					(letter) => letter === newsType.substr(0, 1).toLowerCase()
				)
					? 'An'
					: 'A'}{' '}
				{newsType.substr(0, 1).toUpperCase() + newsType.substr(1)}
			</h2>
		);
	}
};

export default Header;
