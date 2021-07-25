import classes from './index.module.css';

import Settings from './Settings';

const Footer = ({ data, setData }) => {
	return (
		<footer>
			<section
				comments={data.comments}
				reactions={data.reactions}
				className={classes.status}
			></section>
			<Settings
				data={data}
				comments={data.comments}
				reactions={data.reactions}
				user_reaction={data.user_reaction}
				setData={setData}
			/>
			<section comments={data.comments} className={classes.comments}></section>
		</footer>
	);
};

export default Footer;
