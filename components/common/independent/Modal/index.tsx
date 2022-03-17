// Credit to:
// - [Creating An Accessible Dialog From Scratch (smashingmagazine.com)](https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/)
// - [How To Make Modal Windows Better For Everyone](https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/)

import {
	KeyboardEvent,
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
		handleSetIsModalVisibleOptions?: { [key: string]: any }
	) => void;
	handleSetIsModalVisibleOptions?: { [key: string]: any };
}

interface IProps {
	children: JSX.Element | JSX.Element[]; // ReactNode;
	// setIsModalVisible?: IntrinsicAttributes & INewsItemProvidedContextProps & { children?: ReactNode; };
	isModalVisible: boolean;
	modalVisibilityHandler: TPropsHandler0 | IPropsHandler1;
	modalClasses?: {
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

const ModalComponent = ({
	children,
	// handleSetIsModalVisible,
	// handleSetIsModalVisibleOptions,
	modalVisibilityHandler,
	isModalVisible,
	modalClasses,
}: IProps) => {
	const isChildrenArray = Array.isArray(children);

	const modalProps = useRef<{
		lastElementFocusedBeforeThisModal: Element | null;
		bodyOverflowBeforeModal?: string;
		// modalWrapperFocusableElements?: NodeListOf<Element>;
	}>({
		lastElementFocusedBeforeThisModal: null,
		bodyOverflowBeforeModal: undefined,
		// modalWrapperFocusableElements: undefined,
	});
	const modalContainerCloseButtonPropsProps = useRef<HTMLButtonElement>(null);

	const modalWrapperRef = useRef<HTMLDivElement>(null);
	const modalContainerBodyRef = useRef<HTMLDivElement>(null);

	const ElementSelected =
		typeof window !== 'undefined' && document.getElementById('__next');

	const findByKey = (name: 'header' | 'body' | 'footer') => {
		const ModalContainerElementMap = {
			header: ({ children }: { children: ReactNode }) => (
				<header
					className={
						modalClasses?.containerHeader?.default
							? modalClasses?.containerHeader?.default
							: classes.modalHeaderDefault
					}
				>
					{children}
				</header>
			),
			body: ({ children }: { children: ReactNode }) => (
				<section
					className={`${
						modalClasses?.containerBody?.default
							? modalClasses?.containerBody?.default
							: classes.modalBodyDefault
					} ${!isChildrenArray ? classes.onlyModalBodyExistDefault : ''}`}
					ref={modalContainerBodyRef}
				>
					{children}
				</section>
			),
			footer: ({ children }: { children: ReactNode }) => (
				<footer
					className={
						modalClasses?.containerFooter?.default
							? modalClasses?.containerFooter?.default
							: classes.modalFooterDefault
					}
				>
					{children}
				</footer>
			),
		};
		if (
			!children ||
			typeof children === 'string' ||
			typeof children === 'number' ||
			typeof children === 'boolean'
		)
			return <></>;

		if (!isChildrenArray) {
			if (children.key === 'body') {
				const ModalContainerElement = ModalContainerElementMap[name];

				if (!ModalContainerElement) return <></>;

				return <ModalContainerElement>{children}</ModalContainerElement>;
			}

			return <></>;
		}

		const Element = children.filter((child) => child.key === name);

		if (!Element) return <></>;

		const ModalContainerElement = ModalContainerElementMap[name];

		return <ModalContainerElement>{Element}</ModalContainerElement>;
	};

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

		modalVisibilityHandler
			.handleSetIsModalVisible
			// !isModalVisible,
			// modalVisibilityHandler.handleSetIsModalVisibleOptions
			();
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

	console.log("modalProps.current.bodyOverflowBeforeModal", modalProps.current.bodyOverflowBeforeModal);

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
			if (modalProps.current.bodyOverflowBeforeModal)
				document.body.style.overflow =
					modalProps.current.bodyOverflowBeforeModal;
			else {
				document.body.style.overflowX = 'hidden';
				document.body.style.overflowY = 'auto';
			}

			if (
				modalProps.current.lastElementFocusedBeforeThisModal instanceof
				HTMLElement
			) {
				modalProps.current.lastElementFocusedBeforeThisModal.focus();
			}
		}
		// }
	}, [isModalVisible, moveFocusIn]);

	if (!isModalVisible || !ElementSelected) {
		return <></>;
	}

	return createPortal(
		<>
			<div className={classes.modalBackground} onClick={closeModalHandler} />
			<div className={classes.modalWrapper} ref={modalWrapperRef}>
				<div
					className={
						modalClasses?.container?.default
							? modalClasses?.container?.default
							: classes.modalContainerDefault
					}
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
					{isChildrenArray ? (
						<>
							{findByKey('header')}
							{findByKey('body')}
							{findByKey('footer')}
						</>
					) : (
						findByKey('body')
					)}
				</div>
			</div>
		</>,
		ElementSelected
	);
};

export default ModalComponent;
