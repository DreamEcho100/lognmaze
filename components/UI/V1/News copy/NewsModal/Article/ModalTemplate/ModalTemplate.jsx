import { Fragment, useContext, useState } from 'react';

import classes from './ModalTemplate.module.css';
import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import UserContext from '@/store/UserContext';

import Modal from '@/components/UI/V1/Modal/Modal';
import Form from '@/components/UI/V1/Form/Form';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import FormLabel from '@/components/UI/V1/FormLabel/FormLabel';
import FormInput from '@/components/UI/V1/FormInput/FormInput';
import Button from '@/components/UI/V1/Button/Button';

const ModalTemplate = ({
	closeModal,
	fetcher,
	articleContent,
	templateType,
	setArticleContent,
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [formatType, setFormatType] = useState(
		articleContent && articleContent.format_type
			? articleContent.format_type
			: 'normal'
	);
	const [title, setTitle] = useState(
		articleContent && articleContent.title ? articleContent.title : ''
	);
	const [slug, setSlug] = useState(
		articleContent && articleContent.slug ? articleContent.slug : ''
	);
	const [tags, setTags] = useState(
		articleContent && articleContent.tags && articleContent.tags.length
			? articleContent.tags.join(' ')
			: ''
	);
	const [image, setImage] = useState(
		articleContent && articleContent.image ? articleContent.image : ''
	);
	const [description, setDescription] = useState(
		articleContent && articleContent.meta_description
			? articleContent.meta_description
			: ''
	);
	const [excerpt, setExcerpt] = useState(
		articleContent && articleContent.excerpt ? articleContent.excerpt : ''
	);
	const [content, setContent] = useState(
		articleContent && articleContent.content ? articleContent.content : ''
	);

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setFormatType('normal');
		setTitle('');
		setSlug('');
		setTags('');
		setImage('');
		setDescription('');
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
				type: 'article',
				authorUserNameId: user.user_name_id,
				formatType,
				title,
				slug,
				image,
				tags: tags.toLowerCase().trim().split(/\s+/),
				description,
				content,
			};
		} else if (templateType === 'update') {
			const oldTags = articleContent.tags;
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
				id: articleContent.id,
				type: 'article',
				formatType,
				title,
				slug,
				image,
				removedTags,
				addedTags,
				description,
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
						// resetInputs();
					} else if (templateType === 'update') {
						closeModal();
						setArticleContent({
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
				<h2>Create A article</h2>
			</Fragment>
			<Fragment key='body'>
				<Form onSubmit={handleSubmit} className={classes.form}>
					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='article-format-type'>Format Type: </FormLabel>
						<select
							name='article-format-type'
							id='article-format-type'
							value={formatType}
							onChange={(event) => setFormatType(event.target.value)}
						>
							<option value='normal'>normal</option>
							<option value='md'>md</option>
						</select>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='article-title'>Title: </FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='article-title'
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
						<FormLabel htmlFor='article-meta-title'>
							Tags: {tags.toLowerCase().trim().split(/\s+/).join(', ')}
						</FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='article-meta-tags'
							minLength={10}
							maxLength={255}
							paceholder='If not used it will use the tags'
							value={tags}
							onChange={(event) => setTags(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='article-slug'>Slug: </FormLabel>
						<p id='article-slug'>{slug}</p>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='article-image'>Image: </FormLabel>
						<FormInput
							extraClasses={classes.input}
							className={classes['form-input']}
							type='text'
							id='article-image'
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
							htmlFor='article-discription'
						>
							Discription:{' '}
						</FormLabel>
						<textarea
							className={classes['form-text-area']}
							type='text'
							id='article-discription'
							minLength={50}
							maxLength={255}
							required
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='article-content'>Content: </FormLabel>
						<textarea
							className={`${classes['form-text-area']} ${classes.content}`}
							id='article-content'
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
							submit
						</Button>
					</FormControl>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ModalTemplate;
