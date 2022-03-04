interface THandleAddingLoadingSkeletonClassProps {
	isLoadingSkeleton: boolean;
	classes: { [key: string]: any };
	defaultClass: string;
}

export type THandleAddingLoadingSkeletonClass = (
	props: THandleAddingLoadingSkeletonClassProps
) => string;
