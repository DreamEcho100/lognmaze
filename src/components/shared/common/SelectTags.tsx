import type { Dispatch, SetStateAction, LiHTMLAttributes } from 'react';

import { cx } from 'class-variance-authority';
import { useId, useState } from 'react';

export const ValueContainer = <T extends { value: string | number | boolean }>({
	item,
	setTags,
	filterFunc,
	...props
}: {
	item: T;
	setTags: Dispatch<SetStateAction<T[]>>;
	filterFunc: (item: T) => (prevIem: T, index: number, array: T[]) => boolean;
} & LiHTMLAttributes<HTMLLIElement>) => {
	return (
		<li
			{...props}
			className='group flex h-fit overflow-hidden rounded-md font-medium'
		>
			<button
				onClick={() => setTags((prev) => prev.filter(filterFunc(item)))}
				className='color-theme-primary-500 py-1 px-2'
				title={`remove '${item.value}' from the Tags list`}
			>
				x
			</button>
			<span
				className={cx(
					'flex items-center justify-center py-1 px-2',
					'color-theme-primary-100',
					'group-hover:color-theme-primary-200 group-focus-within:color-theme-primary-300'
				)}
			>
				{item.value}
			</span>
		</li>
	);
};

const SelectTags = <
	T extends { key: string | number; value: string | number | boolean }
>({
	setTags,
	filterFunc,
	addFunc,
	Tags,
	ValueContainer: ValueContainerComp = ValueContainer
}: {
	setTags: Dispatch<SetStateAction<T[]>>;
	Tags: T[];
	addFunc: (prev: T[], tag: string) => T[];
	filterFunc: (item: T) => (prevIem: T, index: number, array: T[]) => boolean;
	ValueContainer?: <
		T extends {
			value: string | number | boolean;
		}
	>({
		item,
		setTags,
		filterFunc,
		...props
	}: {
		item: T;
		setTags: Dispatch<SetStateAction<T[]>>;
		filterFunc: (item: T) => (prevIem: T, index: number, array: T[]) => boolean;
	} & LiHTMLAttributes<HTMLLIElement>) => JSX.Element;
	// typeof ValueContainer;
}) => {
	const inputId = useId();
	const [tag, setTag] = useState('');

	return (
		<div className='color-theme-300 flex flex-col gap-1 px-2 py-4'>
			<label htmlFor={`Tags-${inputId}`} className='font-bold'>
				Tags
			</label>
			<ul className='flex flex-wrap items-center gap-2 overflow-hidden'>
				{Tags.map((item) => (
					<ValueContainerComp
						key={item.key}
						filterFunc={filterFunc}
						setTags={setTags}
						item={item}
					/>
				))}
			</ul>
			<input
				id={`Tags-${inputId}`}
				value={tag}
				onChange={(event) => setTag(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.keyCode === 13) {
						event.preventDefault();
						setTags((prev) => addFunc(prev, tag));
						setTag('');
					}
				}}
				className='color-theme-100 h-fit grow px-1 py-2'
			/>
		</div>
	);
};

export default SelectTags;
