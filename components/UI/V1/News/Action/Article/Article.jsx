import { Fragment, useContext, useState } from 'react';

import classes from './Article.module.css';
import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import UserContext from '@/store/UserContext';

import Form from '@/components/UI/V1/Form/Form';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import FormLabel from '@/components/UI/V1/FormLabel/FormLabel';
import FormInput from '@/components/UI/V1/FormInput/FormInput';
import Textarea from '@/components/UI/V1/Textarea/Textarea';
import Button from '@/components/UI/V1/Button/Button';

const Article = ({ closeModal, fetcher, actionType, data, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [formatType, setFormatType] = useState(
		data && data.format_type ? data.format_type : 'normal'
	);
	const [title, setTitle] = useState(data && data.title ? data.title : '');
	const [slug, setSlug] = useState(data && data.slug ? data.slug : '');
	const [tags, setTags] = useState(
		data && data.tags && data.tags.length ? data.tags.join(' ') : ''
	);
	const [image, setImage] = useState(data && data.image ? data.image : '');
	const [description, setDescription] = useState(
		data && data.meta_description ? data.meta_description : ''
	);
	const [excerpt, setExcerpt] = useState(
		data && data.excerpt ? data.excerpt : ''
	);
	const [content, setContent] = useState(
		data && data.content ? data.content : ''
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
		let bodyObj;
		const tags_array = [];

		if (actionType === 'create') {
			bodyObj = {
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
		} else if (actionType === 'update') {
			const oldTags = data.tags;
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
				newsArticleId: data.id,
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
					if (actionType === 'create') {
						resetInputs();
					} else if (actionType === 'update') {
						setData({
							...data,
							tags: tags_array,
						});

						setTimeout(() => closeModal(), 100);
					}
				});
		} catch (error) {
			console.error(error);
			setAfterFormSubmitMessage(error.message);
			setBtnsDisabled(false);
		}
	};

	return (
		<Form
			extraClasses={classes.form}
			onSubmit={handleSubmit}
			className={classes.form}
		>
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
				<FormLabel extraClasses={classes.input} htmlFor='article-discription'>
					Discription:{' '}
				</FormLabel>
				<Textarea
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
				<Textarea
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
	);
};

export default Article;
