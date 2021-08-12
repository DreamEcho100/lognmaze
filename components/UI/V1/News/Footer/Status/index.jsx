import classes from './index.module.css';

const Status = ({ data, showComments, setShowComments }) => {
	console.log('data', data);

	return (
		<section className={classes.status}>
			<div className={`${classes.reactions} ${classes['status-item']}`}>
				{data.reactions.map((item, index) => {
					return (
						<button
							key={item.news_reaction_id || index}
							className={`${classes.reaction} ${item.type}`}
						>
							{item.type} {item.counter}
						</button>
					);
				})}
			</div>
			<div
				onClick={() => {
					if (!showComments) {
						setShowComments(true);
					}
				}}
				className={`${classes.comments_counter} ${classes['status-item']}`}
			>
				<button>comments: {data.comments_counter}</button>
			</div>
		</section>
	);
};

export default Status;
