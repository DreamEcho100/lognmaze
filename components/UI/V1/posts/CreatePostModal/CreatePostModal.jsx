import { Fragment, useContext, useState } from 'react';

import classes from './CreatePostModal.module.css';
import BoxShadowClasses from '../../BoxShadow.module.css';

import UserContext from '../../../../../store/UserContext';

import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import FormControl from '../../FormControl/FormControl';
import FormLabel from '../../FormLabel/FormLabel';
import FormInput from '../../FormInput/FormInput';
import Button from '../../Button/Button';

const CreatePostModal = ({ closeModal }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	// author_id
	const [formatType, setFormatType] = useState('normal');
	const [title, setTitle] = useState('');
	const [metaTitle, setMetaTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [tags, setTags] = useState('');
	const [image, setImage] = useState('');
	const [metaDescription, setMetaDescription] = useState('');
	const [excerpt, setExcerpt] = useState('');
	const [content, setContent] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleSubmit = async (event) => {
		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);

		event.preventDefault();
		const bodyObj = {
			authorId: user.id,
			formatType,
			title,
			metaTitle,
			slug,
			image,
			tags: tags.toLowerCase().trim().split(/\s+/),
			metaDescription,
			excerpt,
			content,
		};

		try {
			await fetch('/api/v1/user/posts/add', {
				method: 'POST',
				body: JSON.stringify(bodyObj),
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
			})
				.then((response) => response.json())
				.then(({ status, message }) => {
					if (status === 'error') {
						console.error(message);
						setBtnsDisabled(false);
						setAfterFormSubmitMessage(message);
						return;
					}
					setBtnsDisabled(false);
					// setFormatType('normal');
					setTitle('');
					setMetaTitle('');
					setSlug('');
					setTags('');
					setImage('');
					setMetaDescription('');
					setExcerpt('');
					setContent('');
				});
		} catch (error) {
			console.error(error);
			setAfterFormSubmitMessage(error.message);
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
						<FormLabel htmlFor='post-meta-discription'>
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

export default CreatePostModal;
