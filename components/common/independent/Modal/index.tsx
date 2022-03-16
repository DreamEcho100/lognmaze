import { ReactNode, useEffect } from 'react';
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

const ModalComponent = ({
	children,
	// handleSetIsModalVisible,
	// handleSetIsModalVisibleOptions,
	modalVisibilityHandler,
	isModalVisible,
	modalClasses,
}: IProps) => {
	const isChildrenArray = Array.isArray(children);

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

	const ElementSelected =
		typeof window !== 'undefined' && document.getElementById('__next');

	useEffect(() => {
		// if (typeof window === 'undefined') return;

		// if (document.body.style.overflow) {
		if (isModalVisible) {
			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'auto';
		}
		// }
	}, [isModalVisible]);

	if (!isModalVisible || !ElementSelected) {
		return <></>;
	}

	return createPortal(
		<>
			<div
				className={classes.modalBackground}
				onClick={() => {
					if (typeof modalVisibilityHandler === 'function')
						return modalVisibilityHandler();
					if (!modalVisibilityHandler.handleSetIsModalVisible) return;

					modalVisibilityHandler
						.handleSetIsModalVisible
						// !isModalVisible,
						// modalVisibilityHandler.handleSetIsModalVisibleOptions
						();
				}}
			/>
			<div className={classes.modalWrapper}>
				<div
					className={
						modalClasses?.container?.default
							? modalClasses?.container?.default
							: classes.modalContainerDefault
					}
				>
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
