import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import classes from './Header.module.css';

import { dateToHumanReadableDate } from '../../../../../lib/v1/time';

import UserContext from '@store/UserContext';
import CommonNav from './CommonNav/CommonNav';
import TimeAndDate from './TimeAndDate/TimeAndDate';

const Header = ({ data, setData, setCloseModal, hideHeaderSettings }) => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isDataOwner, setIsDataOwner] = useState(false);

	useEffect(() => {
		if (user && user.user_name_id === data.author_user_name_id) {
			setIsDataOwner(true);
		} else if (isDataOwner) {
			setIsDataOwner(false);
		}
	}, [user]);

	return (
		<header>
			<CommonNav
				isDataOwner={isDataOwner}
				data={data}
				setData={setData}
				hideSettings={hideHeaderSettings}
			/>
			{data.type === 'article' && (
				<section>
					<TimeAndDate
						setCloseModal={setCloseModal}
						created_at={data.created_at}
						updated_on={data.updated_on}
					/>
					<div className=''>
						{!router.query.slug && data.type === 'article' ? (
							<Link href={`/article/${data.slug}`}>
								<a
								// target='_blank' rel='noopener noreferrer'
								>
									<h1>{data.title}</h1>
								</a>
							</Link>
						) : (
							<h1>{data.title}</h1>
						)}
						<img
							src={data.image}
							alt=''
							style={{ width: '100%' }}
							loading='lazy'
							onClick={() => {
								if (setCloseModal) setCloseModal(false);
							}}
						/>
						<p>
							<strong>Tags:</strong> {data.tags.join(', ')}
						</p>
					</div>
				</section>
			)}

			{data.type === 'post' && (
				<section>
					<TimeAndDate
						setCloseModal={setCloseModal}
						created_at={data.created_at}
						updated_on={data.updated_on}
					/>
				</section>
			)}
		</header>
	);
};

export default Header;
