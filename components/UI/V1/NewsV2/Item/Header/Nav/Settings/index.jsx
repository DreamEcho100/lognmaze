import { useContext } from 'react';
import dynamic from 'next/dynamic';

import classes from './index.module.css';

const DynamicDropdownMenuOwnerItems = dynamic(
	() => import('./DropdownMenuOwnerItems'),
	{
		ssr: false,
	}
);

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import ShareNews from './ShareNews';

const NewsItemNavSettings = ({
	isLoadingSkeleton,
	isDataOwner,
	newsItemData,
}) => {
	return (
		<DropdownMenu
			className={
				isLoadingSkeleton
					? `${classes['settings-button']} ${classes.isLoadingSkeleton} skeleton-loading`
					: ''
			}
		>
			{!isLoadingSkeleton && (
				<>
					{isDataOwner && (
						<DynamicDropdownMenuOwnerItems newsItemData={newsItemData} />
					)}
					<li>
						<ShareNews newsItemData={newsItemData} />
					</li>
				</>
			)}
		</DropdownMenu>
	);
};

export default NewsItemNavSettings;
