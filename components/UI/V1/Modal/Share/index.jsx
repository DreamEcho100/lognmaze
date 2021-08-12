import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import SocialMediaShareLink from '@components/UI/V1/SocialMediaShareLink';
import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';

const ShareModel = ({
	data,
	paltforms = { all: true },
	showShareModel,
	setShowShareModel,
}) => {
	let url = `https://${
		'lognmaze.vercel.app' || process.env.FRONT_END_ROOT_URL
	}/`;
	let quote = '';
	let hashtag = [];
	let title = '';
	let summary = '';
	let source = `https://${
		'lognmaze.vercel.app' || process.env.FRONT_END_ROOT_URL
	}`;

	if (data.type === 'article') {
		url += `article/${data.slug}`;
		title = data.title;
		summary = data.description;
		quote = data.description;
		hashtag = data.tags || [];
	} else if (data.type === 'post') {
		url += `post/${data.id}`;
		title = data.content;
		summary = data.content;
		quote = data.content;
		hashtag = [];
	}

	return (
		<Modal
			showModal={showShareModel}
			setShowShareModel={setShowShareModel}
			click={() => setShowShareModel(false)}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h2>Share In Your Favourite Social Media</h2>
			</Fragment>
			<Fragment key='body'>
				<section>
					{(paltforms.all || paltforms.facebook) && (
						<button
							className={`${classes['social-platform']} ${classes.facebook}`}
						>
							<SocialMediaShareLink
								type='facebook'
								url={url}
								quote={quote}
								hashtag={hashtag}
							>
								<FontAwesomeIcon icon={['fab', 'facebook']} />
								<p className={classes['link-text']}>Facebook</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.linkedin) && (
						<button
							className={`${classes['social-platform']} ${classes.linkedin}`}
						>
							<SocialMediaShareLink
								type='linkedin'
								url={url}
								title={title}
								summary={summary}
								source={source}
							>
								<FontAwesomeIcon icon={['fab', 'linkedin']} />
								<p className={classes['link-text']}>Linkedin</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.reddit) && (
						<button
							className={`${classes['social-platform']} ${classes.reddit}`}
						>
							<SocialMediaShareLink type='reddit' url={url} title={title}>
								<FontAwesomeIcon icon={['fab', 'reddit']} />
								<p className={classes['link-text']}>Reddit</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.telegram) && (
						<button
							className={`${classes['social-platform']} ${classes.telegram}`}
						>
							<SocialMediaShareLink type='telegram' url={url} title={title}>
								<FontAwesomeIcon icon={['fab', 'telegram']} />
								<p className={classes['link-text']}>Telegram</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.tumblr) && (
						<button
							className={`${classes['social-platform']} ${classes.tumblr}`}
						>
							<SocialMediaShareLink
								type='tumblr'
								url={url}
								title={title}
								caption={data.description}
								tags={data.tags}
							>
								<FontAwesomeIcon icon={['fab', 'tumblr']} />
								<p className={classes['link-text']}>Tumblr</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.twitter) && (
						<button
							className={`${classes['social-platform']} ${classes.twitter}`}
						>
							<SocialMediaShareLink
								type='twitter'
								url={url}
								text={title}
								hashtags={data.tags}
							>
								<FontAwesomeIcon icon={['fab', 'twitter']} />
								<p className={classes['link-text']}>Twitter</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.whatsapp) && (
						<button
							className={`${classes['social-platform']} ${classes.whatsapp}`}
						>
							<SocialMediaShareLink type='whatsapp' url={url} title={title}>
								<FontAwesomeIcon icon={['fab', 'whatsapp']} />
								<p className={classes['link-text']}>Whatsapp</p>
							</SocialMediaShareLink>
						</button>
					)}
				</section>
			</Fragment>
		</Modal>
	);
};

export default ShareModel;
