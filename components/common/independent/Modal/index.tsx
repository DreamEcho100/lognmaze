// Credit to:
// - [Creating An Accessible Dialog From Scratch (smashingmagazine.com)](https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/)
// - [How To Make Modal Windows Better For Everyone](https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/)

import {
	FC,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { createPortal } from 'react-dom';

import classes from './index.module.css';

type TPropsHandler0 = () => void;
interface IPropsHandler1 {
	handleSetIsModalVisible: (
		isModalVisible?: boolean,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		handleSetIsModalVisibleOptions?: { [key: string]: any }
	) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleSetIsModalVisibleOptions?: { [key: string]: any };
}

export interface IModalComponentProps {
	children: JSX.Element | JSX.Element[];
	// setIsModalVisible?: IntrinsicAttributes & INewsItemProvidedContextProps & { children?: ReactNode; };
	isModalVisible: boolean;
	modalVisibilityHandler: TPropsHandler0 | IPropsHandler1;
	modalClasses?: {
		wrapper?: {
			default?: string;
			new: string;
		};
		container?: {
			default?: string;
			new: string;
		};
		containerHeader?: {
			default?: string;
			new: string;
		};
		containerBody?: {
			default?: string;
			new: string;
		};
		containerFooter?: {
			default?: string;
			new: string;
		};
	};
}

const focusableSelectors = [
	'a[href]:not([tabindex^="-"])',
	'area[href]:not([tabindex^="-"])',
	'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
	'input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked',
	'select:not([disabled]):not([tabindex^="-"])',
	'textarea:not([disabled]):not([tabindex^="-"])',
	'button:not([disabled]):not([tabindex^="-"])',
	'iframe:not([tabindex^="-"])',
	'audio[controls]:not([tabindex^="-"])',
	'video[controls]:not([tabindex^="-"])',
	'[contenteditable]:not([tabindex^="-"])',
	'[tabindex]:not([tabindex^="-"])',
];

const ModalComponent: FC<IModalComponentProps> = ({
	children,
	modalVisibilityHandler,
	isModalVisible,
	modalClasses,
}) => {
	// const isChildrenArray = Array.isArray(children);

	const modalProps = useRef<{
		lastElementFocusedBeforeThisModal: Element | null;
		bodyOverflowBeforeModal?: string;
	}>({
		lastElementFocusedBeforeThisModal: null,
		bodyOverflowBeforeModal: undefined,
	});
	const modalContainerCloseButtonPropsProps = useRef<HTMLButtonElement>(null);

	const modalWrapperRef = useRef<HTMLDivElement>(null);
	const modalContainerBodyRef = useRef<HTMLDivElement>(null);

	const ElementSelected = typeof window !== 'undefined' && document.body;

	const findByKey = (
		name: 'header' | 'body' | 'footer',
		children: JSX.Element[]
	) => children.filter((child) => child.key === name);

	const getFocusableChildren = () => {
		const elements: Element[] = [];

		modalWrapperRef.current
			?.querySelectorAll(focusableSelectors.join(','))
			?.forEach((nodeElem) => elements.push(nodeElem));

		return elements.filter(
			(element) =>
				element instanceof HTMLElement &&
				(element.offsetWidth ||
					element.offsetWidth ||
					element.getClientRects().length)
		);
	};

	const closeModalHandler = () => {
		if (typeof modalVisibilityHandler === 'function')
			return modalVisibilityHandler();
		if (!modalVisibilityHandler.handleSetIsModalVisible) return;

		modalVisibilityHandler.handleSetIsModalVisible();
	};

	const moveFocusIn = useCallback(() => {
		const target =
			modalContainerBodyRef.current?.querySelector('[autofocus]') ||
			getFocusableChildren()[0];

		if (target instanceof HTMLElement) target.focus();
	}, []);

	const trapTapKey = (event: KeyboardEvent<HTMLDivElement>) => {
		const node = modalContainerBodyRef.current;
		if (!document.activeElement || !node) return;

		const focusableChildren = getFocusableChildren();
		const focusedItemIndex = focusableChildren.indexOf(document.activeElement);
		const lastIndex = focusableChildren.length - 1;
		const withShift = event.shiftKey;
		const withCtrlKey = event.ctrlKey;

		if (withCtrlKey && withShift && focusedItemIndex === 0) {
			if (focusableChildren[lastIndex] instanceof HTMLElement) {
				(focusableChildren[lastIndex] as HTMLElement).focus();
			}
			event.preventDefault();
		} else if (!withShift && focusedItemIndex === lastIndex) {
			if (focusableChildren[0] instanceof HTMLElement) {
				(focusableChildren[0] as HTMLElement).focus();
			}
			event.preventDefault();
		}
	};
	const modalContainerOnKeyDownEventHandler = (
		event: KeyboardEvent<HTMLDivElement>
	) => {
		if (event.key === 'Escape') return closeModalHandler();
		if (event.key === 'Tab') return trapTapKey(event);
	};
	useEffect(() => {
		if (isModalVisible) {
			modalProps.current.bodyOverflowBeforeModal = getComputedStyle(
				document.body
			).overflow;

			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'hidden';

			modalProps.current.lastElementFocusedBeforeThisModal =
				document.activeElement;

			moveFocusIn();
		} else {
			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'auto';

			if (
				modalProps.current.lastElementFocusedBeforeThisModal instanceof
				HTMLElement
			) {
				modalProps.current.lastElementFocusedBeforeThisModal.focus();
			}
		}
	}, [isModalVisible, moveFocusIn]);

	if (!isModalVisible || !ElementSelected) {
		return <></>;
	}

	return createPortal(
		<>
			<div
				className={`${
					modalClasses?.wrapper?.default
						? modalClasses?.wrapper?.default
						: classes.wrapper
				} ${modalClasses?.wrapper?.new || ''}`}
				ref={modalWrapperRef}
				onClick={(event: MouseEvent) => {
					event.stopPropagation();
					if (event.target === event.currentTarget) closeModalHandler();
				}}
			>
				{/* <div className={classes.wrapper}> */}
				<div
					className={`${
						modalClasses?.container?.default
							? modalClasses?.container?.default
							: classes.modalContainerDefault
					} ${modalClasses?.container?.new || ''}`}
					onKeyDown={modalContainerOnKeyDownEventHandler}
				>
					<button
						// tabIndex={0}
						ref={modalContainerCloseButtonPropsProps}
						onClick={closeModalHandler}
						type='button'
						className={classes.ModalCloseButton}
						aria-label='close'
					>
						x
					</button>
					{Array.isArray(children) ? (
						<>
							<header
								className={`${
									modalClasses?.containerHeader?.default
										? modalClasses?.containerHeader?.default
										: classes.modalHeaderDefault
								} ${modalClasses?.containerHeader?.new || ''}`}
							>
								{findByKey('header', children)}
							</header>
							<section
								className={`${`${
									modalClasses?.containerBody?.default
										? modalClasses?.containerBody?.default
										: classes.modalBodyDefault
								} ${modalClasses?.containerBody?.new || ''}`} ${
									!Array.isArray(children)
										? classes.onlyModalBodyExistDefault
										: ''
								}`}
								ref={modalContainerBodyRef}
							>
								{findByKey('body', children)}
							</section>
							<footer
								className={`${
									modalClasses?.containerFooter?.default
										? modalClasses?.containerFooter?.default
										: classes.modalFooterDefault
								} ${modalClasses?.containerFooter?.new || ''}`}
							>
								{findByKey('footer', children)}
							</footer>
						</>
					) : (
						<section
							className={`${`${
								modalClasses?.containerBody?.default
									? modalClasses?.containerBody?.default
									: classes.modalBodyDefault
							} ${modalClasses?.containerBody?.new || ''}`} ${
								!Array.isArray(children)
									? classes.onlyModalBodyExistDefault
									: ''
							}`}
							ref={modalContainerBodyRef}
						>
							{children}
						</section>
					)}
				</div>
				{/* </div> */}
			</div>
		</>,
		ElementSelected
	);
};

export default ModalComponent;
