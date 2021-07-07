import { Fragment, useContext, useState } from 'react';

import classes from './PostModalTemplate1.module.css';
import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import UserContext from '@/store/UserContext';

import Modal from '@/components/UI/V1/Modal/Modal';
import Form from '@/components/UI/V1/Form/Form';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import FormLabel from '@/components/UI/V1/FormLabel/FormLabel';
import FormInput from '@/components/UI/V1/FormInput/FormInput';
import Button from '@/components/UI/V1/Button/Button';

const PostModalTemplate1 = ({
	closeModal,
	fetcher,
	postContent,
	templateType,
	setPostContent,
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [formatType, setFormatType] = useState(
		postContent && postContent.format_type ? postContent.format_type : 'normal'
	);
	const [title, setTitle] = useState(
		postContent && postContent.title ? postContent.title : ''
	);
	const [metaTitle, setMetaTitle] = useState(
		postContent && postContent.metaTitle ? postContent.metaTitle : ''
	);
	const [slug, setSlug] = useState(
		postContent && postContent.slug ? postContent.slug : ''
	);
	const [tags, setTags] = useState(
		postContent && postContent.tags && postContent.tags.length
			? postContent.tags.join(' ')
			: ''
	);
	const [image, setImage] = useState(
		postContent && postContent.image ? postContent.image : ''
	);
	const [metaDescription, setMetaDescription] = useState(
		postContent && postContent.meta_description
			? postContent.meta_description
			: ''
	);
	const [excerpt, setExcerpt] = useState(
		postContent && postContent.excerpt ? postContent.excerpt : ''
	);
	const [content, setContent] = useState(
		postContent && postContent.content ? postContent.content : ''
	);

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setFormatType('normal');
		setTitle('');
		setMetaTitle('');
		setSlug('');
		setTags('');
		setImage('');
		setMetaDescription('');
		setExcerpt('');
		setContent('');
	};

	const handleSubmit = async (event) => {
		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);

		event.preventDefault();
		let bodyObj = {};
		const tags_array = [];

		if (templateType === 'create') {
			bodyObj = {
				authorId: user.id,
				authorUserNameId: user.user_name_id,
				formatType,
				title,
				metaTitle: metaTitle && metaTitle.length > 10 ? metaTitle : null,
				slug,
				image,
				tags: tags.toLowerCase().trim().split(/\s+/),
				metaDescription,
				excerpt: excerpt && excerpt.length > 10 ? excerpt : null,
				content,
			};
		} else if (templateType === 'update') {
			const oldTags = postContent.tags;
			const newTags = tags.toLowerCase().trim().split(/\s+/);

			const removedTags = [];
			const addedTags = [];

			oldTags.forEach((item) => {
				if (!newTags.includes(item)) {
					removedTags.push(item);
				} else {
					tags_array.push(item);
				}
			});

			newTags.forEach((item) => {
				if (!oldTags.includes(item)) {
					addedTags.push(item);
					tags_array.push(item);
				}
			});

			// tags_array = tags
			// 	.toLowerCase()
			// 	.trim()
			// 	.split(/\s+/)
			// 	.filter((item) => removedTags.includes(item));
			// tags_array = [...tags_array, ...addedTags];

			bodyObj = {
				id: postContent.id,
				formatType,
				title,
				metaTitle,
				slug,
				image,
				removedTags,
				addedTags,
				metaDescription,
				excerpt,
				content,
			};
		}

		try {
			await fetcher({ bodyObj, token: user.token })
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						console.error(message);
						setBtnsDisabled(false);
						setAfterFormSubmitMessage(message);
						return;
					}
					setBtnsDisabled(false);
					if (templateType === 'create') {
						resetInputs();
					} else if (templateType === 'update') {
						closeModal();
						setPostContent({
							...data,
							tags: tags_array,
						});
					}
				});
		} catch (error) {
			console.error(error);
			setAfterFormSubmitMessage(error.message);
			setBtnsDisabled(false);
		}
	};

	return (
		<Modal
			click={closeModal}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h2>Create A Post</h2>
			</Fragment>
			<Fragment key='body'>
				<Form onSubmit={handleSubmit} className={classes.form}>
					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-format-type'>Format Type: </FormLabel>
						<select
							name='post-format-type'
							id='post-format-type'
							value={formatType}
							onChange={(event) => setFormatType(event.target.value)}
						>
							<option value='normal'>normal</option>
							<option value='md'>md</option>
						</select>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-title'>Title: </FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='post-title'
							minLength={10}
							maxLength={255}
							required
							value={title}
							onChange={(event) => {
								setTitle(event.target.value);
								setSlug(
									`${event.target.value}`
										.replace(/[^\w-\_]/gi, '-')
										// .replace(/[/\\\'\"&\`]/gi, '-')
										.replace(/(-{1,})/gi, '-')
										.toLowerCase()
								);
							}}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-meta-title'>
							Tags: {tags.toLowerCase().trim().split(/\s+/).join(', ')}
						</FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='post-meta-tags'
							minLength={10}
							maxLength={255}
							paceholder='If not used it will use the tags'
							value={tags}
							onChange={(event) => setTags(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-meta-title'>Meta Title: </FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='post-meta-title'
							minLength={10}
							maxLength={255}
							paceholder='If not used it will use the title'
							value={metaTitle}
							onChange={(event) => setMetaTitle(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-slug'>Slug: </FormLabel>
						<p id='post-slug'>{slug}</p>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-image'>Image: </FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='post-image'
							// minLength={10}
							// maxLength={255}
							// required
							value={image}
							onChange={(event) => setImage(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel
							extraClasses={classes.input}
							htmlFor='post-meta-discription'
						>
							Meta Discription:{' '}
						</FormLabel>
						<textarea
							className={classes['form-text-area']}
							type='text'
							id='post-meta-discription'
							minLength={50}
							maxLength={255}
							required
							value={metaDescription}
							onChange={(event) => setMetaDescription(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-excerpt'>Excerpt: </FormLabel>
						<textarea
							className={classes['form-text-area']}
							type='text'
							id='post-excerpt'
							minLength={50}
							maxLength={255}
							paceholder='If not used it will use the Meta Description'
							value={excerpt}
							onChange={(event) => setExcerpt(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-content'>Content: </FormLabel>
						<textarea
							className={`${classes['form-text-area']} ${classes.content}`}
							id='post-content'
							required
							value={content}
							minLength={100}
							onChange={(event) => setContent(event.target.value)}
						/>
					</FormControl>
					{afterFormSubmitMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{afterFormSubmitMessage}</p>
						</div>
					)}
					<FormControl className={classes['form-control']}>
						<Button disabled={btnsDisabled} type='submit'>
							Post
						</Button>
					</FormControl>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default PostModalTemplate1;
