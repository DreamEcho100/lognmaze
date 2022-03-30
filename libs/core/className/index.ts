import { THandleAddingLoadingSkeletonClass } from './ts';

export const handleAddingLoadingSkeletonClass: THandleAddingLoadingSkeletonClass =
	({ isLoadingSkeleton, classes = {}, defaultClass = '' }) => {
		return `${classes} ${
			isLoadingSkeleton
				? `${defaultClass} ${classes.isLoadingSkeleton} skeleton-loading`
				: defaultClass
		}`;
	};
