interface IHandleAllClassesProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	classes: { [key: string]: any };
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

export type THandleAllClasses = (props: IHandleAllClassesProps) => string;
