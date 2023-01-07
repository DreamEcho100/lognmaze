import { cx } from 'class-variance-authority';
import type { FormEvent, ReactNode } from 'react';
import FAQs from './FAQs';
import type { ToolSEOTagsProps } from './ToolSEOTags';

import ToolSEOTags from './ToolSEOTags';

export const Container = ({
	children,
	header,
	data
}: {
	children: ReactNode;
	header: { title: string; description?: string };
} & ToolSEOTagsProps) => {
	return (
		<>
			<ToolSEOTags data={data} />
			<section className='section-p flex flex-col gap-4'>
				<header className='text-center'>
					<h1 className='text-h1'>{header.title}</h1>
					{header.description && <p>{header.description}</p>}
				</header>
				<div className='flex flex-col gap-4 md:flex-row'>{children}</div>
				<FAQs faqs={data.faqs} />
			</section>
		</>
	);
};

export const Form = ({
	children,
	onSubmit
}: {
	onSubmit: (event: FormEvent) => void;
	children: ReactNode;
}) => {
	return (
		<form onSubmit={onSubmit} className='flex w-full flex-col gap-4 md:w-1/2'>
			{children}
		</form>
	);
};

export const Result = ({
	children,
	className
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <div className={cx('w-full md:w-1/2', className)}>{children}</div>;
};

const FTRSection = {
	Container,
	Form,
	Result
};

export default FTRSection;
