interface THandleAddingLoadingSkeletonClassProps {
	isLoadingSkeleton: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	classes: { [key: string]: any };
	defaultClass: string;
}

export type THandleAddingLoadingSkeletonClass = (
	props: THandleAddingLoadingSkeletonClassProps
) => string;
