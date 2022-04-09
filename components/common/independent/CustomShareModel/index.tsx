import { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import SocialMediaLinksData from '@commonLibIndependent/SocialMediaLinksData';

import SocialMediaShareLink from './SocialMediaShareLink';
import ButtonComponent from '@commonComponentsIndependent/Button';
import ModalComponent from '@commonComponentsIndependent/Modal';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import InputComponent from '@commonComponentsIndependent/Input';

interface IProps {
	itemData: TNewsItemData;
	isModalVisible: boolean;
	modalVisibilityHandler: (/* isModalVisible?: boolean */) => void;
	platforms:
		| Parameters<typeof SocialMediaLinksData>['0']['socialMediaType'][]
		| 'all';
}

const CustomShareModelComponent = ({
	itemData,
	platforms = 'all',
	// showShareModel,
	// setShowShareModel,
	isModalVisible,
	modalVisibilityHandler,
}: IProps) => {
	const [, setUseInput] = useState(true);
	const [inputCopiedToClipboard, setInputCopiedToClipboard] = useState(true);

	let url =
		// 'https://lognmaze.com/';
		`${process.env.FRONT_END_ROOT_URL}/`;
	const quote = '';
	let tags: string[] = [];
	let title = '';
	let summary = '';
	const source = 'https://lognmaze.com';
	let caption = '';
	// `https://${
	// 	'lognmaze.vercel.app' || process.env.FRONT_END_ROOT_URL
	// }`;

	if (itemData.type === 'blog') {
		url += `blogs/${itemData.type_data.slug}`;
		title = itemData.type_data.title;
		caption = summary = itemData.type_data.description;
		// quote = itemData.type_data.description;
		tags = itemData.type_data.tags || [];
	} else if (itemData.type === 'post') {
		url += `posts/${itemData.news_id}`;
		title = itemData.type_data.content;
		caption = summary = itemData.type_data.content;
		// quote = itemData.type_data.content;
		tags = [];
	}

	const copyToClipboard = (element: HTMLInputElement) => {
		element.focus();
		element.select();
		element.setSelectionRange(0, 99999);

		navigator.clipboard.writeText(element.value);
	};

	useEffect(() => {
		if (inputCopiedToClipboard) {
			setInputCopiedToClipboard(false);

			const formInput: HTMLInputElement | null = document.querySelector(
				`.${classes.formInput}`
			);

			if (!formInput) return;

			copyToClipboard(formInput);
			// let setTimeoutId;

			// clearTimeout(setTimeoutId);

			// setTimeoutId = setTimeout(() => {
			// }, 3000);

			setInputCopiedToClipboard(true);
		}
	}, [inputCopiedToClipboard]);

	return (
		<ModalComponent
			isModalVisible={isModalVisible}
			modalVisibilityHandler={modalVisibilityHandler}
		>
			<Fragment key='header'>
				<h2>Share In Your Favorite Social Media</h2>
			</Fragment>
			<Fragment key='body'>
				<section>
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('facebook') !== -1)) && (
						<button
							title='Facebook Share Button'
							className={`${classes.socialPlatform} ${classes.facebook}`}
						>
							<SocialMediaShareLink
								// title='Share it on facebook'
								SocialMediaLinksDataProps={{
									socialMediaType: 'facebook',
									url,
									hashtag: tags,
									title,
									quote,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'facebook']} />
								<p className={classes.linkText}>Facebook</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('linkedin') !== -1)) && (
						<button
							title='Linkedin Share Button'
							className={`${classes.socialPlatform} ${classes.linkedin}`}
						>
							<SocialMediaShareLink
								// title='Share it on linkedin'
								SocialMediaLinksDataProps={{
									socialMediaType: 'linkedin',
									url,
									title,
									source,
									summary,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'linkedin']} />
								<p className={classes.linkText}>Linkedin</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('reddit') !== -1)) && (
						<button
							title='Reddit Share Button'
							className={`${classes.socialPlatform} ${classes.reddit}`}
						>
							<SocialMediaShareLink
								// title='Share it on reddit'
								SocialMediaLinksDataProps={{
									socialMediaType: 'reddit',
									url,
									title,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'reddit']} />
								<p className={classes.linkText}>Reddit</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('telegram') !== -1)) && (
						<button
							title='Telegram Share Button'
							className={`${classes.socialPlatform} ${classes.telegram}`}
						>
							<SocialMediaShareLink
								// title='Share it on telegram'
								SocialMediaLinksDataProps={{
									socialMediaType: 'telegram',
									url,
									title,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'telegram']} />
								<p className={classes.linkText}>Telegram</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('tumblr') !== -1)) && (
						<button
							title='Tumblr Share Button'
							className={`${classes.socialPlatform} ${classes.tumblr}`}
						>
							<SocialMediaShareLink
								// title='Share it on tumblr'
								SocialMediaLinksDataProps={{
									socialMediaType: 'tumblr',
									url,
									title,
									caption,
									// posttype,
									tags,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'tumblr']} />
								<p className={classes.linkText}>Tumblr</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('twitter') !== -1)) && (
						<button
							title='Twitter Share Button'
							className={`${classes.socialPlatform} ${classes.twitter}`}
						>
							<SocialMediaShareLink
								// title='Share it on twitter'
								SocialMediaLinksDataProps={{
									socialMediaType: 'twitter',
									url,
									title,
									hashtags: tags,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'twitter']} />
								<p className={classes.linkText}>Twitter</p>
							</SocialMediaShareLink>
						</button>
					)}
					{(platforms === 'all' ||
						(Array.isArray(platforms) &&
							platforms.indexOf('whatsapp') !== -1)) && (
						<button
							title='Whatsapp Share Button'
							className={`${classes.socialPlatform} ${classes.whatsapp}`}
						>
							<SocialMediaShareLink
								// title='Share it on whatsapp'
								SocialMediaLinksDataProps={{
									socialMediaType: 'whatsapp',
									url,
									title,
								}}
							>
								<FontAwesomeIcon icon={['fab', 'whatsapp']} />
								<p className={classes.linkText}>Whatsapp</p>
							</SocialMediaShareLink>
						</button>
					)}
					<FormControlComponent className={classes.formControl}>
						<InputComponent
							className={classes.formInput}
							// elementUseIn={(element) => copyToClipboard(element)}
							// useElement={useInput}
							// setElementUseIn={setUseInput}
							readOnly
							value={url}
						/>
						<ButtonComponent
							title={
								inputCopiedToClipboard
									? 'Copied to clipboard!'
									: 'Or copy the link!'
							}
							className='d-flex flex-xy-center'
							onClick={() => setUseInput(true)}
						>
							<FontAwesomeIcon icon={['fas', 'copy']} />
						</ButtonComponent>
					</FormControlComponent>
				</section>
			</Fragment>
		</ModalComponent>
	);
};

export default CustomShareModelComponent;
