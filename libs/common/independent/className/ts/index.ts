interface IHandleAllClassesProps {
	classes: { [key: string]: any };
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

export type THandleAllClasses = (props: IHandleAllClassesProps) => string;
