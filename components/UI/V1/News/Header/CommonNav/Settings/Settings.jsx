import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './Settings.module.css';

import NewsContextTest from '@store/NewsContextTest';
import { handleLoadingNewsItemContent } from '@store/NewsContextTest/actions';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
const ActionDynamic = dynamic(() =>
	import('@components/UI/V1/News/Action/Action')
);

import ShareModel from '@components/UI/V1/Modal/Share';
import UpdateNews from './UpdateNews';
import DeleteNews from './DeleteNews';
import ShareNews from './ShareNews';

const Settings = ({ isDataOwner, newsItem }) => {
	const { dispatch } = useContext(NewsContextTest);

	return (
		<DropdownMenu>
			{isDataOwner && (
				<>
					<li className={`${classes['settings-item-for-newsItem-owner']}`}>
						<UpdateNews
							ActionDynamic={ActionDynamic}
							newsItem={newsItem}
							handleLoadingNewsItemContent={handleLoadingNewsItemContent}
							dispatch={dispatch}
						/>
					</li>
					<li className={`${classes['settings-item-for-newsItem-owner']}`}>
						<DeleteNews
							ActionDynamic={ActionDynamic}
							newsItem={newsItem}
							handleLoadingNewsItemContent={handleLoadingNewsItemContent}
							dispatch={dispatch}
						/>
					</li>
				</>
			)}
			<li>
				<ShareNews ShareModel={ShareModel} newsItem={newsItem} />
			</li>
		</DropdownMenu>
	);
};

export default Settings;
