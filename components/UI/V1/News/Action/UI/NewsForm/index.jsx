import { useEffect, useState } from 'react';

import classes from './index.module.css';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Button from '@components/UI/V1/Button';
import NewsFormArticle from './Article';
import NewsFormPost from './Post';

const NewsForm = ({
	newsItemData,
	setShowModal,
	actionOnSubmit,
	isResettingInputsAfterSubmit, // = false,
	isClosingModalAfterSubmit, // = true,
	newsType,
	actionType,
}) => {
	const [values, setValues] = useState({
		title: newsItemData?.title ? newsItemData.title : '',
		slug: newsItemData?.slug ? newsItemData.slug : '',
		iso_language: newsItemData?.iso_language ? newsItemData.iso_language : 'en',
		iso_country: newsItemData?.iso_country ? newsItemData.iso_country : 'US',
		tags:
			newsItemData?.tags && newsItemData.tags.length ? newsItemData.tags : [],
		image_alt: newsItemData?.image_alt ? newsItemData.image_alt : '',
		image_src: newsItemData?.image_src ? newsItemData.image_src : '',
		description: newsItemData?.description ? newsItemData.description : '',
		content: newsItemData?.content ? newsItemData.content : '',
	});

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [isLoadingContent, setIsLoadingContent] = useState(
		!!newsItemData.isLoadingContent
	);
	const [isButtonsDisabled, setIsButtonsDisabled] = useState(
		!!newsItemData.isLoadingContent
	);
	const [showFormatConvertorModal, setShowFormatConvertorModal] =
		useState(false);

	const resetInputs = () => {
		setValues({
			title: '',
			slug: '',
			iso_language: 'en',
			iso_country: 'US',
			tags: [],
			image_alt: '',
			image_src: '',
			description: '',
			content: '',
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setAfterFormSubmitMessage(() => <></>);
		setIsButtonsDisabled(true);

		const fieldsCheck = [];

		if (newsItemData.type === 'article') {
			if (values.title.replace(/\s{2,}/g, '').length < 20)
				fieldsCheck.push('Title is less than 25 characters.');
			else if (values.title.replace(/\s{2,}/g, '').length > 120)
				fieldsCheck.push('Title is more than 120 characters.');

			// if (values.slug.replace(/\s{2,}/g, '').length < 25)
			// 	fieldsCheck.push('Slug is less than 25 characters.');

			if (values.tags.length < 2)
				fieldsCheck.push('At least there should be 2 tags.');
			else if (values.tags.length > 10)
				fieldsCheck.push("Tags shouldn't be more than 10.");

			if (values.image_alt.replace(/\s{2,}/g, '').length < 3)
				fieldsCheck.push('Image title is less than 3 characters.');
			else if (values.image_alt.replace(/\s{2,}/g, '').length > 150)
				fieldsCheck.push('Image title is more than 150 characters.');

			if (values.image_src.replace(/\s/g, '').length === 0)
				fieldsCheck.push('There is no image source.');
			if (!values.image_src.replace(/\s/g, '').startsWith('https'))
				fieldsCheck.push("Image source doesn't start with https.");

			if (values.description.replace(/\s{2,}/g, '').length < 25)
				fieldsCheck.push('Description is less than 25 characters.');
			// else if (values.description.length > 160)
			// 	fieldsCheck.push('Description is more than 160 characters.');

			if (values.content.replace(/\s{2,}/g, '').length < 25)
				fieldsCheck.push('Content is less than 25 characters.');
		} else {
			if (values.content.replace(/\s{2,}/g, '').length < 2)
				fieldsCheck.push('Content is less than 2 characters.');
		}

		if (fieldsCheck.length > 0) {
			setAfterFormSubmitMessage(() =>
				fieldsCheck.map((item, index) => <li key={index}>{item}</li>)
			);
			setIsButtonsDisabled(false);
			return;
		}

		let result = {};

		// if (actionType === 'create') {
		// 	result = await createNews(values, 'article');
		// } else if (actionType === 'update') {
		// 	result = await updateNews(newsItemData.type, newsItemData, values);
		// }

		const formattedValues = {
			...values,
			title: values.title.trim(),
			image_alt: values.image_alt.trim(),
			// description: values.description,
			// content: values.content,
		};

		result =
			actionType === 'create'
				? await actionOnSubmit({ values: formattedValues })
				: await actionOnSubmit({
						oldValues: newsItemData,
						newValues: formattedValues,
				  });

		// 	await (async () => {
		// 	if (actionType === 'create') return await actionOnSubmit({ values });
		// 	if (actionType === 'update')
		// 		return await actionOnSubmit({ oldValues: newsItemData, newValues: values });
		// })();

		setIsButtonsDisabled(false);

		if (result.status === 'error') {
			return setAfterFormSubmitMessage(() => <li>{result.message}</li>);
		}

		// if (isResettingInputsAfterSubmit) resetInputs();
		if (isClosingModalAfterSubmit) setShowModal(false);
	};

	useEffect(() => {
		if (isLoadingContent !== !!newsItemData.isLoadingContent) {
			setIsLoadingContent(!!newsItemData.isLoadingContent);
			setIsButtonsDisabled(!!newsItemData.isLoadingContent);
		}
	}, [isLoadingContent, newsItemData.isLoadingContent]);

	/*
	useEffect(() => {
		if (newsItemData.type === 'article') {
			setValues({
				title: newsItemData?.title ? newsItemData.title : '',
				slug: newsItemData?.slug ? newsItemData.slug : '',
				iso_language: newsItemData?.iso_language
					? newsItemData.iso_language
					: 'en',
				iso_country: newsItemData?.iso_country
					? newsItemData.iso_country
					: 'US',
				tags:
					newsItemData?.tags && newsItemData.tags.length
						? newsItemData.tags
						: [],
				image_alt: newsItemData?.image_alt ? newsItemData.image_alt : '',
				image_src: newsItemData?.image_src ? newsItemData.image_src : '',
				description: newsItemData?.description ? newsItemData.description : '',
				content: newsItemData?.content ? newsItemData.content : '',
			});
		} else {
			setValues({
				content: newsItemData?.content ? newsItemData.content : '',
			});
		}
	}, [newsItemData]);
	*/

	return (
		<Form
			extraClasses={classes.form}
			onSubmit={handleSubmit}
			className={classes.form}
		>
			{newsType === 'article' && (
				<NewsFormArticle
					newsItemData={newsItemData}
					setShowModal={setShowModal}
					actionOnSubmit={actionOnSubmit}
					isResettingInputsAfterSubmit={isResettingInputsAfterSubmit}
					isClosingModalAfterSubmit={isClosingModalAfterSubmit}
					//
					classes={classes}
					//
					values={values}
					setValues={setValues}
					isLoadingContent={isLoadingContent}
					//
					actionType={actionType}
					//
					AfterFormSubmitMessage={AfterFormSubmitMessage}
					setAfterFormSubmitMessage={setAfterFormSubmitMessage}
					//
					isButtonsDisabled={isButtonsDisabled}
					setIsButtonsDisabled={setIsButtonsDisabled}
					//
					showFormatConvertorModal={showFormatConvertorModal}
					setShowFormatConvertorModal={setShowFormatConvertorModal}
					//
				/>
			)}

			{newsType === 'post' && (
				<NewsFormPost
					newsItemData={newsItemData}
					setShowModal={setShowModal}
					actionOnSubmit={actionOnSubmit}
					isResettingInputsAfterSubmit={isResettingInputsAfterSubmit}
					isClosingModalAfterSubmit={isClosingModalAfterSubmit}
					//
					classes={classes}
					//
					values={values}
					setValues={setValues}
					//
					AfterFormSubmitMessage={AfterFormSubmitMessage}
					setAfterFormSubmitMessage={setAfterFormSubmitMessage}
					//
					isButtonsDisabled={isButtonsDisabled}
					setIsButtonsDisabled={setIsButtonsDisabled}
					//
					showFormatConvertorModal={showFormatConvertorModal}
					setShowFormatConvertorModal={setShowFormatConvertorModal}
					//
				/>
			)}

			<div
			// className={classes.warning}
			>
				<ul>{AfterFormSubmitMessage}</ul>
			</div>

			<FormControl>
				<Button title='Submit Form' disabled={isButtonsDisabled} type='submit'>
					submit
				</Button>
			</FormControl>
		</Form>
	);
};

export default NewsForm;
