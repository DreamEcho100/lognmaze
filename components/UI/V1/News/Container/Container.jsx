import { Fragment, useContext, useEffect, useState } from 'react';

import classes from './Container.module.css';
import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';
import BorderClasses from '@components/UI/V1/Border.module.css';

import UserContext from '@store/UserContext';
import { handleAllClasses } from '../../utils/index';

import NewsHeader from '../Header/Header';
import Details from '../Details/Details';
import NewsFooter from '../Footer';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Container2 from '@components/UI/V1/News/Container/Container';

const Container = ({
	defaultClasses = `container`,
	extraClasses = '',
	className = '',
	...props
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [data, setData] = useState(props.data);
	// const [isLoading, setIsLoading] = useState(data.news_id ? false : true);
	// const [isLoadingNewsStatus, setIsLoadingNewsStatus] = useState(data.reactions && data.comments ? false : true);
	const [isLoadingReactions, setIsLoadingReactions] = useState(
		props.loadReactions
	);
	const [closeModal, setCloseModal] = useState(true);
	const [statusLoaded, setStatusLoaded] = useState(false);

	const allClasses = handleAllClasses({
		classes,
		defaultClasses: `${defaultClasses}${
			props.containerType !== 'sub' ? ' container-max-width' : ''
		}`,
		extraClasses,
		className,
	});

	const articleProps = {
		className: `${allClasses} ${BoxShadowClasses['box-shadow']} ${BorderClasses['border-2']}`,
	};

	// useEffect(async () => {
	// }, []);

	useEffect(async () => {
		if (!UserCxt.isLoading) {
			if (isLoadingReactions) {
				if (data.news_id && !data.reactions) {
					let query = `news_id=${data.news_id}`;
					if (user.id) query += `&news_reactor_id=${user.id}`;

					const {
						status,
						message,
						data: dataReaction,
					} = await fetch(`/api/v1/news/reactions/reaction/?${query}`).then(
						(response) => response.json()
					);

					if (status === 'error') {
						console.error(message);
						return;
					}

					setData((prev) => ({
						...prev,
						...dataReaction,
					}));

					setIsLoadingReactions(false);
				}
			}

			if (
				/*!data.reactions &&  */
				!data.reactions ||
				(Array.isArray(data.reactions) && data.reactions.length === 0)
			) {
				setData((prev) => ({
					...prev,
					reactions: [
						{ news_reaction_id: '', type: 'upvote', count: 0 },
						{ news_reaction_id: '', type: 'downvote', count: 0 },
					],
				}));
			} else {
				const messingReactions = [];
				if (!data.reactions.find((item) => item.type === 'upvote')) {
					messingReactions.push({
						news_reaction_id: '',
						type: 'upvote',
						count: 0,
					});
				}
				if (!data.reactions.find((item) => item.type === 'downvote')) {
					messingReactions.push({
						news_reaction_id: '',
						type: 'downvote',
						count: 0,
					});
				}
				if (messingReactions.length !== 0) {
					setData((prev) => ({
						...prev,
						reactions: [...prev.reactions, ...messingReactions],
					}));
				}
			}

			if (
				/*!data.comments && */
				!data.comments ||
				(Array.isArray(data.comments) && data.comments.length === 0)
			) {
				setData((prev) => ({
					...prev,
					comments: [],
				}));
			}

			if (Object.keys(user).length === 0) {
				setData((prev) => ({
					...prev,
					user_reaction: '',
				}));
			}

			if (
				props.containerType === 'sub' &&
				!data.content &&
				props.handleLoadindArticleContent
			) {
				await props.handleLoadindArticleContent();
			}

			// if (isLoading) setIsLoading(false);
		}
	}, [UserCxt.isLoading, user]);

	const handleLoadindArticleContent = async (id) => {
		await fetch(`/api/v1/news/articles/article/content/${id}`)
			.then((response) => response.json())
			.then(({ message, status, data }) => {
				setData((prev) => ({
					...prev,
					...data,
				}));
			})
			.catch((error) => console.error(error));
	};

	// if (isLoading) {
	// 	return <article>Loading...</article>;
	// }

	if (data.type === 'article')
		articleProps.lang = `${data.iso_language}-${data.iso_country}`;

	if (Object.keys(data).length === 0) {
		return <article style={{ minHeight: '100vh' }}></article>;
	}

	return (
		<article {...articleProps}>
			<NewsHeader
				data={props.containerType === 'sub' ? props.data : data}
				setData={props.containerType === 'sub' ? props.setData : setData}
				setCloseModal={setCloseModal}
				hideHeaderSettings={props.hideHeaderSettings}
			/>
			<Details
				data={props.containerType === 'sub' ? props.data : data}
				setData={props.containerType === 'sub' ? props.setData : setData}
				detailsType={props.detailsType}
				setCloseModal={setCloseModal}
			/>
			<NewsFooter
				data={props.containerType === 'sub' ? props.data : data}
				setData={props.containerType === 'sub' ? props.setData : setData}
				isLoadingReactions={isLoadingReactions}
			/>

			{props.ModalOnClick && !closeModal && props.containerType !== 'sub' && (
				<Modal
					click={() => setCloseModal(true)}
					CloseButtonElement={(props) => (
						<Button type='button' {...props}>
							Close
						</Button>
					)}
					modelClasses={{
						'modal-wrapper': { width: '90%', maxWidth: 'none' },
						'modal-container': { background: 'rgba(255, 255, 255)' },
					}}
				>
					<Fragment key='header'>
						{/* <Header data={data} setData={setData} /> */}
					</Fragment>
					<Fragment key='body'>
						<Container2
							containerType='sub'
							modalClosed={closeModal}
							handleLoadindArticleContent={() =>
								handleLoadindArticleContent(data.news_id)
							}
							data={data}
							setData={setData}
							detailsType='content'
						/>
					</Fragment>
				</Modal>
			)}
		</article>
	);
};

export default Container;
