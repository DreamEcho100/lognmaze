import { Fragment, useEffect, useState } from 'react';

import classes from './Container.module.css';
import BoxShadowClasses from '../../../../../components/UI/V1/BoxShadow.module.css';

import NewsHeader from '../Header/Header';
import Details from '../Details/Details';
// import NewsModal from '../Modal/Modal';

import Modal from '@/components/UI/V1/Modal/Modal';
import Button from '@/components/UI/V1/Button/Button';
import Container2 from '@/components/UI/V1/News/Container/Container';

const Container = (props) => {
	const [data, setData] = useState(props.data);
	const [closeModal, setCloseModal] = useState(true);

	useEffect(() => setData(data), [props.data]);

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

	useEffect(async () => {
		if (data.type === 'article' && !data.content) {
			if (props.ModalOnClick) await handleLoadindArticleContent(data.news_id);
		}
	}, [data]);

	const articleProps = {
		className: `${classes.container} ${BoxShadowClasses['box-shadow']}`,
	};

	if (data.type === 'article')
		articleProps.lang = `${data.iso_language}-${data.iso_country}`;

	return (
		<>
			<article {...articleProps}>
				<NewsHeader
					data={data}
					setData={setData}
					setCloseModal={setCloseModal}
				/>
				<Details
					data={data}
					setData={setData}
					detailsType={props.detailsType}
					setCloseModal={setCloseModal}
				/>
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
						<Container2 data={data} detailsType='content' />
					</Fragment>
				</Modal>
			)}

			{/* {props.ModalOnClick && !closeModal && (
				<NewsModal
					setCloseModal={setCloseModal}
					data={data}
					detailsType='content'
					setData={setData}
				/>
			)} */}
		</>
	);
};

export default Container;
