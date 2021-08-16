import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));
const DynamicSocialMediaShareLink = dynamic(() =>
	import('@components/UI/V1/SocialMediaShareLink')
);

// import Modal from '@components/UI/V1/Modal';
// import SocialMediaShareLink from '@components/UI/V1/SocialMediaShareLink';
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
		<DynamicModal
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
							<DynamicSocialMediaShareLink
								type='facebook'
								url={url}
								quote={quote}
								hashtag={hashtag}
							>
								<FontAwesomeIcon icon={['fab', 'facebook']} />
								<p className={classes['link-text']}>Facebook</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.linkedin) && (
						<button
							className={`${classes['social-platform']} ${classes.linkedin}`}
						>
							<DynamicSocialMediaShareLink
								type='linkedin'
								url={url}
								title={title}
								summary={summary}
								source={source}
							>
								<FontAwesomeIcon icon={['fab', 'linkedin']} />
								<p className={classes['link-text']}>Linkedin</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.reddit) && (
						<button
							className={`${classes['social-platform']} ${classes.reddit}`}
						>
							<DynamicSocialMediaShareLink
								type='reddit'
								url={url}
								title={title}
							>
								<FontAwesomeIcon icon={['fab', 'reddit']} />
								<p className={classes['link-text']}>Reddit</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.telegram) && (
						<button
							className={`${classes['social-platform']} ${classes.telegram}`}
						>
							<DynamicSocialMediaShareLink
								type='telegram'
								url={url}
								title={title}
							>
								<FontAwesomeIcon icon={['fab', 'telegram']} />
								<p className={classes['link-text']}>Telegram</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.tumblr) && (
						<button
							className={`${classes['social-platform']} ${classes.tumblr}`}
						>
							<DynamicSocialMediaShareLink
								type='tumblr'
								url={url}
								title={title}
								caption={data.description}
								tags={data.tags}
							>
								<FontAwesomeIcon icon={['fab', 'tumblr']} />
								<p className={classes['link-text']}>Tumblr</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.twitter) && (
						<button
							className={`${classes['social-platform']} ${classes.twitter}`}
						>
							<DynamicSocialMediaShareLink
								type='twitter'
								url={url}
								text={title}
								hashtags={data.tags}
							>
								<FontAwesomeIcon icon={['fab', 'twitter']} />
								<p className={classes['link-text']}>Twitter</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
					{(paltforms.all || paltforms.whatsapp) && (
						<button
							className={`${classes['social-platform']} ${classes.whatsapp}`}
						>
							<DynamicSocialMediaShareLink
								type='whatsapp'
								url={url}
								title={title}
							>
								<FontAwesomeIcon icon={['fab', 'whatsapp']} />
								<p className={classes['link-text']}>Whatsapp</p>
							</DynamicSocialMediaShareLink>
						</button>
					)}
				</section>
			</Fragment>
		</DynamicModal>
	);
};

export default ShareModel;
