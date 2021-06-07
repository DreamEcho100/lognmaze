import { Fragment, useContext, useState } from 'react';

import classes from './CreatePostButtonModal.module.css';
import BoxShadowClasses from '../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../store/UserContext';

import Modal from '../../UI/V1/Modal/Modal';
import Form from '../../UI/V1/Form/Form';
import FormControl from '../../UI/V1/FormControl/FormControl';
import FormLabel from '../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../UI/V1/FormInput/FormInput';
import Button from '../../UI/V1/Button/Button';

const CreatePostModal = ({ closeModal }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	// author_id
	const [formatType, setFormatType] = useState('normal');
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [metaDescription, setMetaDescription] = useState('');
	const [excerpt, setExcerpt] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		const dataObj = {
			author_id: user.id,
			format_type: formatType,
			title,
			slug,
			meta_description: metaDescription,
			excerpt,
			content,
		};
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
						<FormLabel htmlFor='post-name'>Title: </FormLabel>
						<FormInput
							className={classes['form-input']}
							type='text'
							id='post-name'
							minLength={10}
							maxLength={255}
							required
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-slug'>Slug: </FormLabel>
						<FormInput
							className={classes['form-input']}
							type='text'
							id='post-slug'
							minLength={10}
							maxLength={255}
							required
							value={slug}
							onChange={(event) => setSlug(event.target.value)}
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
							required
							value={excerpt}
							onChange={(event) => setExcerpt(event.target.value)}
						/>
					</FormControl>

					<FormControl className={classes['form-control']}>
						<FormLabel htmlFor='post-content'>Content: </FormLabel>
						<textarea
							className={classes['form-text-area']}
							id='post-content'
							required
							value={content}
							minLength={100}
							onChange={(event) => setContent(event.target.value)}
						/>
					</FormControl>
					<FormControl className={classes['form-control']}>
						<Button type='submit'>Post</Button>
					</FormControl>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default CreatePostModal;
