import { useContext } from 'react';
import dynamic from 'next/dynamic';

import classes from './Settings.module.css';

import NewsContext from '@store/NewsContext';
import { handleLoadingNewsItemContent } from '@store/NewsContext/actions';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
const ActionDynamic = dynamic(() =>
	import('@components/UI/V1/News/Action/Action')
);
const DynamicUpdateNews = dynamic(() => import('./UpdateNews'));
const DynamicDeleteNews = dynamic(() => import('./DeleteNews'));
const DynamicShareModel = dynamic(() =>
	import('@components/UI/V1/Modal/Share')
);
const DynamicShareNews = dynamic(() => import('./ShareNews'));

const Settings = ({ isDataOwner, newsItem }) => {
	const { dispatch } = useContext(NewsContext);

	return (
		<DropdownMenu>
			{isDataOwner && (
				<>
					<li className={`${classes['settings-item-for-newsItem-owner']}`}>
						<DynamicUpdateNews
							ActionDynamic={ActionDynamic}
							newsItem={newsItem}
							handleLoadingNewsItemContent={handleLoadingNewsItemContent}
							dispatch={dispatch}
						/>
					</li>
					<li className={`${classes['settings-item-for-newsItem-owner']}`}>
						<DynamicDeleteNews
							ActionDynamic={ActionDynamic}
							newsItem={newsItem}
							handleLoadingNewsItemContent={handleLoadingNewsItemContent}
							dispatch={dispatch}
						/>
					</li>
				</>
			)}
			<li>
				<DynamicShareNews ShareModel={DynamicShareModel} newsItem={newsItem} />
			</li>
		</DropdownMenu>
	);
};

export default Settings;
