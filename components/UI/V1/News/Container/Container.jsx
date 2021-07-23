import { Fragment, useContext, useEffect, useRef, useState } from 'react';

import classes from './Container.module.css';
import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';
import BorderClasses from '@components/UI/V1/Border.module.css';

import UserContext from '@store/UserContext';
import { handleAllClasses } from '../../utils/index';

import NewsHeader from '../Header/Header';
import Details from '../Details/Details';
import NewsFooter from '../Footer';

import Modal from '@components/UI/V1/Modal/Modal';
import Button from '@components/UI/V1/Button/Button';
import Container2 from '@components/UI/V1/News/Container/Container';

const Container = ({
	defaultClasses = `container`,
	extraClasses = '',
	className = '',
	...props
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [data, setData] = useState(props.data);
	const [closeModal, setCloseModal] = useState(true);
	const [statusLoaded, setStatusLoaded] = useState(false);

	const articleRef = useRef();

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

	if (!data.comments) {
		setData((prev) => ({
			...prev,
			comments: {
				count: 0,
				data: [],
			},
		}));
	}

	if (!data.reactions) {
		setData((prev) => ({
			...prev,
			reactions: {
				userReaction: '',
				types: {
					upvote: {
						count: 0,
						id: '',
						data: [],
					},
					downvote: {
						count: 0,
						id: '',
						data: [],
					},
				},
			},
		}));
	}

	const handleLoadindArticleContent = async (id) => {
		await fetch(`/api/v1/news/articles/article/content/${id}`)
			.then((response) => response.json())
			.then(({ message, status, ...result }) => {
				setData({
					...data,
					...result.data,
				});
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => setData(data), [props.data]);

	useEffect(async () => {
		if (data.type === 'article' && !data.content) {
			if (props.ModalOnClick) await handleLoadindArticleContent(data.news_id);
		}

		if (
			props.containerType === 'sub' &&
			props.action !== 'delete'
			// &&
			// props.setData &&
			// JSON.stringify(props.data) !== JSON.stringify(data)
		) {
			props.setData((prev) => ({
				...prev,
				...data,
			}));
		}
	}, [data]);

	const onView = async (event) => {
		// console.log('statusLoaded', statusLoaded);
		// console.log('data', data);
		if (!statusLoaded) {
			if (
				document.body.offsetHeight >
				articleRef.current.getBoundingClientRect().top
			) {
				if (statusLoaded) return;
				let statusLoadedIsTrue;

				if (
					data.reactions.types.upvote.length !== 0 ||
					data.reactions.types.downvote.length !== 0 ||
					data.reactions.userReaction.length !== 0
				) {
				} else {
					let fetchInput = `api/v1/news/reactions/reaction/?news_id=${data.news_id}`;
					if (user.id) fetchInput += `&news_reactor_id=${user.id}`;
					const result = await fetch(fetchInput).then((response) =>
						response.json()
					);

					const reactions = {
						userReaction: '',
						types: {},
					};

					result.data.forEach((item) => {
						if (item.user_reaction) reactions.userReaction = item.type;
						reactions.types[item.type] = {
							news_reaction_id: item.news_reaction_id,
							count: item.count,
						};
					});
					
					console.log('data', data);

					setData((prev) => {
						statusLoadedIsTrue = true;
						return {
							...prev,
							reactions: {
								...prev.reactions,
								...reactions,
							},
						};
					});

					console.log('data', data);

					setStatusLoaded((prev) => {
						if (prev) {
							statusLoadedIsTrue = true;
							window.removeEventListener('scroll', onView);
							return prev;
						}
						window.removeEventListener('scroll', onView);
						return true;
					});
				}

				if (statusLoadedIsTrue) {
					return window.removeEventListener('scroll', onView);
				}
			}
		}
	};

	useEffect(async () => {
		await onView();
		// document.body.removeEventListener('scroll', onView);
		// document.body.addEventListener('scroll', onView);
		// window.removeEventListener('scroll', onView);
		// window.addEventListener('scroll', onView);
	}, []);

	if (data.type === 'article')
		articleProps.lang = `${data.iso_language}-${data.iso_country}`;

	if (Object.keys(data).length === 0) {
		return <></>;
	}

	return (
		<>
			<article ref={articleRef} {...articleProps}>
				<NewsHeader
					data={data}
					setData={setData}
					setCloseModal={setCloseModal}
					hideHeaderSettings={props.hideHeaderSettings}
				/>
				<Details
					data={data}
					setData={setData}
					detailsType={props.detailsType}
					setCloseModal={setCloseModal}
				/>
				<NewsFooter data={data} setData={setData} />
			</article>

			{props.ModalOnClick && !closeModal && (
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
							data={data}
							setData={setData}
							detailsType='content'
						/>
					</Fragment>
				</Modal>
			)}
		</>
	);
};

export default Container;
