import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { Dialog as HeadlessuiDialog, Transition } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';
import { Fragment } from 'react';
import { cva, cx } from 'class-variance-authority';
import { createPortal } from 'react-dom';

const handleContentVariants = cva(
	[
		'fixed z-50',
		'w-[95vw] max-h-[90vh] overflow-y-auto max-w-2xl flex flex-col gap-6 md:w-full',
		'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'
	],
	{
		variants: {
			bg: {
				'neutral-100': 'color-theme-100'
			},
			p: {
				md: 'px-4 py-8 sm:px-8',
				mdWithCloseButton: 'px-4 pt-10 pb-8 sm:px-8',
				none: ''
			},
			shadow: {
				'inner-v1': 'shadow-inner-v1'
			}
		},
		defaultVariants: {
			bg: 'neutral-100',
			p: 'md',
			shadow: 'inner-v1'
		}
	}
);

export interface IDialog {
	onClose: (open: boolean) => void; //Function;
	show: boolean;
	children?: ReactNode;
	defaultCloseButtonActive?: boolean;
	contentVariants?: VariantProps<typeof handleContentVariants>;
}
const Dialog = ({
	show,
	onClose,
	children,
	defaultCloseButtonActive,
	contentVariants = {}
}: IDialog) => {
	const bodyElem = typeof document !== 'undefined' ? document.body : false;

	if (!bodyElem) return <></>;

	return createPortal(
		<Transition appear show={show} as={Fragment}>
			<HeadlessuiDialog as='div' className='relative z-10' onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<HeadlessuiDialog.Overlay
						// forceMount
						className='fixed inset-0 z-20 bg-black/50 bg-opacity-50'
					/>
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<HeadlessuiDialog.Panel
						// forceMount
						className={handleContentVariants({
							...contentVariants,
							p: contentVariants.p
								? contentVariants.p
								: defaultCloseButtonActive
								? 'mdWithCloseButton'
								: undefined
						})}
					>
						{defaultCloseButtonActive && (
							<DialogClose
								onClose={onClose}
								className='absolute right-4 top-4 translate-x-1 -translate-y-1'
							/>
						)}
						{children}
					</HeadlessuiDialog.Panel>
				</Transition.Child>
			</HeadlessuiDialog>
		</Transition>,
		bodyElem
	);
};

export default Dialog;

export const DialogClose = ({
	className,
	onClose
}: {
	className?: string;
	// onClose: Dispatch<SetStateAction<boolean>>;
	onClose: (open: boolean) => void;
}) => {
	return (
		<button
			onClick={() => onClose(false)}
			className={cx(
				className,
				'inline-flex items-center justify-center rounded-md p-3',
				'transition-all duration-300',
				'color-theme-primary-700',
				'cursor-pointer border-0',
				'focus:outline-none focus:ring-[0.25rem] focus:ring-inset focus:ring-theme-primary-bg-500 focus:ring-opacity-75'
			)}
			// onClick={() => onClose(false)}
		>
			<IoMdClose className='scale-150' />
		</button>
	);
};

export const DialogHeader = ({
	title,
	description
}: {
	title: string;
	description?: string;
}) => {
	return (
		<header className=' mx-auto flex flex-col'>
			<HeadlessuiDialog.Title className='text-center text-h3 font-bold'>
				{title}
			</HeadlessuiDialog.Title>
			{description && (
				<HeadlessuiDialog.Description className='text-center text-base font-medium'>
					{description}
				</HeadlessuiDialog.Description>
			)}
		</header>
	);
};
