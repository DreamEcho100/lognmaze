import type {
	OptionHTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	HTMLAttributes,
	TextareaHTMLAttributes,
	Dispatch,
	SetStateAction,
	SelectHTMLAttributes
} from 'react';
import type { VariantProps } from 'class-variance-authority';

import { useId, useMemo } from 'react';
import { cva, cx } from 'class-variance-authority';
import { FaChevronDown } from 'react-icons/fa';

interface ISharedFieldProps<T> {
	labelVariants?: VariantProps<typeof handleLabelVariants>;
	labelTextVariants?: VariantProps<typeof handleLabelTextVariants>;
	inputVariants?: VariantProps<typeof handleInputVariants>;
	selectVariants?: VariantProps<typeof handleSelectVariants>;
	textareaVariants?: VariantProps<typeof handleTextareaVariants>;
	setValues?: Dispatch<SetStateAction<T>>;
	values?: T;
	name?: keyof T;
	labelText?: string;
	labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
	labelChildrenContainer?: HTMLAttributes<HTMLSpanElement>;
}

type TFormFieldInput<T> = InputHTMLAttributes<HTMLInputElement> &
	ISharedFieldProps<T> & {
		isA?: '';
	};

type TFormFieldDropdown<T> = SelectHTMLAttributes<HTMLSelectElement> &
	ISharedFieldProps<T> & {
		options?: OptionHTMLAttributes<HTMLOptionElement>[];
		isA: 'dropdown';
		selectContainerVariants?: VariantProps<
			typeof handleSelectContainerVariants
		>;
		selectArrowVariants?: VariantProps<typeof handleSelectArrowVariants>;
		selectContainerProps?: HTMLAttributes<HTMLDivElement>;
		selectArrowProps?: HTMLAttributes<HTMLSpanElement>;
	};

type TFormFieldTextarea<T> = TextareaHTMLAttributes<HTMLTextAreaElement> &
	ISharedFieldProps<T> & {
		isA: 'textarea';
	};

const TextareaField = <T,>(props: Omit<TFormFieldTextarea<T>, 'isA'>) => {
	return <textarea rows={7.5} {...props} />;
};

const DropdownField = <T,>({
	children,
	selectContainerVariants,
	selectArrowVariants,
	selectContainerProps = {},
	selectArrowProps = {},
	options,
	...props
}: Omit<TFormFieldDropdown<T>, 'isA'>) => {
	return (
		<div
			{...selectContainerProps}
			className={handleSelectContainerVariants(selectContainerVariants)}
		>
			<select {...props}>
				{options
					? options.map((option, index) => <option key={index} {...option} />)
					: children}
			</select>
			<span
				{...selectArrowProps}
				className={handleSelectArrowVariants(selectArrowVariants)}
			>
				<FaChevronDown />
			</span>
		</div>
	);
};

const handleLabelVariants = cva(
	'max-w-full font-bold flex gap-1 cursor-pointer',
	{
		variants: {
			display: {
				dynamicOnSmScreens: 'flex-col sm:flex-row',
				col: 'flex-col',
				'col-reverse': 'flex-col-reverse',
				row: 'flex-row',
				'row-reverse': 'flex-row-reverse'
			},
			flex: {
				grow: 'flex-grow'
			},
			w: {
				fit: 'w-fit'
			}
		},
		defaultVariants: {
			display: 'col'
		}
	}
);
const handleLabelTextVariants = cva('font-bold flex cursor-pointer', {
	variants: {
		items: {
			center: 'flex items-center justify-center',
			centerX: 'flex justify-center',
			centerY: 'flex items-center'
		},
		w: {
			fit: 'w-fit',
			'20%max-8rem': 'w-[20%] max-w-[8rem]',
			'20%max-6rem': 'w-[20%] max-w-[6rem]',
			'20%max-4rem': 'w-[20%] max-w-[4rem]'
		},
		case: {
			capitalize: 'capitalize',
			'keep-case': 'keep-case'
		},
		whitespace: {
			nowrap: 'whitespace-nowrap'
		}
	},
	defaultVariants: {
		items: 'centerY',
		w: 'fit',
		case: 'capitalize'
	}
});
const handleInputVariants = cva(
	'font-medium outline-none cursor-pointer border-0 flex-grow',
	{
		variants: {
			animation: {
				default: [
					'ring-1 ring-inset ring-gray-400 rounded-md',
					'transition-all duration-150',
					'hover:ring-2 dover:ring-gray-100 hover:duration-300',
					'focus:rounded-none focus:ring-1 ring-inset focus:duration-500'
				],
				none: ''
			},
			p: {
				sm: 'px-3 py-2'
			},
			w: {
				full: 'w-full'
			}
		},
		defaultVariants: {
			animation: 'default',
			p: 'sm'
		}
	}
);
const handleSelectVariants = cva(
	'w-full outline-none border-0 cursor-pointer appearance-none font-medium overflow-hidden',
	{
		variants: {
			animation: {
				default: [
					'ring-1 ring-inset ring-gray-400 rounded-md',
					'transition-all duration-150',
					'hover:ring-2 dover:ring-gray-100 hover:duration-300',
					'focus-within:rounded-none focus-within:ring-1 ring-inset focus-within:duration-500'
				],
				none: ''
			},
			p: {
				sm: 'py-2 pr-8 pl-3 rtl:pl-8 rtl:pr-3'
			}
		},
		defaultVariants: {
			animation: 'default',
			p: 'sm'
		}
	}
);
const handleSelectContainerVariants = cva('flex-grow relative');
const handleSelectArrowVariants = cva(
	'pointer-events-none flex justify-center absolute top-1/2 ',
	{
		variants: {
			forSelectP: {
				sm: '-translate-y-1/2  right-2 rtl:left-2'
			}
		},
		defaultVariants: {
			forSelectP: 'sm'
		}
	}
);

const handleTextareaVariants = cva(
	'font-medium outline-none cursor-pointer border-0 flex-grow',
	{
		variants: {
			animation: {
				default: [
					'ring-1 ring-inset ring-gray-400 rounded-md',
					'transition-all duration-150',
					'hover:ring-2 dover:ring-gray-100 hover:duration-300',
					'focus:rounded-none focus:ring-1 ring-inset focus:duration-500'
				],
				none: ''
			},
			p: {
				sm: 'px-3 py-2'
			}
		},
		defaultVariants: {
			animation: 'default',
			p: 'sm'
		}
	}
);

const isATextarea = <T,>(
	isA: unknown,
	props: unknown
): props is TFormFieldTextarea<T> => isA === 'textarea';

const isADropdown = <T,>(
	isA: unknown,
	props: unknown
): props is TFormFieldDropdown<T> => isA === 'dropdown';

const FormField = <T,>({
	labelVariants,
	labelTextVariants,
	inputVariants,
	selectVariants,
	textareaVariants,
	//
	labelProps: { children: labelChildren, ...labelProps } = {},
	labelText,
	labelChildrenContainer,
	setValues,
	values,
	className = '',
	isA,
	name,
	onChange: _onChange,
	value: _value,
	..._props
}: TFormFieldInput<T> | TFormFieldTextarea<T> | TFormFieldDropdown<T>) => {
	const id = useId();

	const onChange = useMemo(() => {
		let onChange = _onChange;

		if (setValues && typeof name === 'string') {
			onChange = (event: Parameters<NonNullable<typeof _onChange>>[0]) => {
				setValues((prev) => {
					if (typeof prev !== 'object') return prev;

					return {
						...prev,
						[name]:
							event.target.type === 'checkbox' && 'checked' in event.target
								? event.target.checked
								: event.target.type === 'date' &&
								  'valueAsDate' in event.target &&
								  event.target.valueAsDate
								? event.target.valueAsDate
								: event.target.type === 'number' &&
								  'valueAsNumber' in event.target &&
								  event.target.valueAsNumber
								? event.target.valueAsNumber
								: event.target.value
					};
				});
			};
		}

		return onChange;
	}, [_onChange, name, setValues]);

	const value = useMemo(() => {
		let value = _value;

		if (
			values &&
			typeof values === 'object' &&
			typeof name === 'string' &&
			name in values
		) {
			const valuesTarget = values[name];
			if (typeof valuesTarget === 'string') value = valuesTarget || '';

			if (typeof valuesTarget === 'number') value = valuesTarget || 0;

			if (valuesTarget instanceof Date) {
				const dateArr = new Intl.DateTimeFormat('en-US')
					.format(valuesTarget || new Date())
					.split('/');
				value = `${dateArr[2]}-${
					dateArr[0]!.length === 1 ? `0${dateArr[0]}` : dateArr[0]
				}-${dateArr[1]!.length === 1 ? `0${dateArr[1]}` : dateArr[1]}`;
			}
		}

		return value;
	}, [_value, name, values]);

	const labelChildrenExist =
		labelText || labelChildren || labelChildrenContainer?.children;

	const props = {
		id,
		..._props,
		onChange,
		value,
		name
	};

	return (
		<label
			htmlFor={id}
			{...labelProps}
			className={cx(handleLabelVariants(labelVariants), labelProps.className)}
		>
			{labelChildrenExist && (
				<span
					{...labelChildrenContainer}
					className={handleLabelTextVariants(labelTextVariants)}
				>
					{labelChildrenExist}
				</span>
			)}
			{isATextarea<T>(isA, props) ? (
				<TextareaField<T>
					className={`${className} ${handleTextareaVariants(textareaVariants)}`}
					{...props}
				/>
			) : isADropdown<T>(isA, props) ? (
				<DropdownField<T>
					className={`${className} ${handleSelectVariants(selectVariants)}`}
					{...props}
				/>
			) : (
				// 	: props.type === "checkbox" ? (
				// <CheckBox
				//   noLabel
				//   {...props}
				//   onChange={onChange as typeof props.onChange}
				//   value={value}
				// />
				// 	)
				<input
					type='text'
					className={`${className} ${handleInputVariants(inputVariants)}`}
					{...(props as TFormFieldInput<T>)}
				/>
			)}
		</label>
	);
};

export default FormField;
