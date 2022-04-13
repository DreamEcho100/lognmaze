import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { NextSeo } from 'next-seo';

import ButtonComponentClasses from '@commonComponentsIndependent/Button/index.module.css';
import helpersClasses from '@styles/helpers.module.css';
import classes from './index.module.css';

import InputComponent from '@commonComponentsIndependent/Input';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import LabelComponent from '@commonComponentsIndependent/Label';
import FormComponent from '@commonComponentsIndependent/Form';
import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import {
	canvasPropertiesFieldsetElement,
	treePropertiesFieldsetElement,
} from './inputsFormData';

type TDrawTree = ({
	startX,
	startY,
	shapeLength,
	angle,
	branchWidth,
	color1,
	color2,
	curve,
	curve2,
	shapeLengthMinLimit,
}: {
	startX: number;
	startY: number;
	shapeLength: number;
	angle: number;
	branchWidth: number;
	color1: string | CanvasGradient | CanvasPattern;
	color2: string | CanvasGradient | CanvasPattern;
	curve: number;
	curve2: number;
	shapeLengthMinLimit: number;
	context: CanvasRenderingContext2D;
}) => void;

const FractalTreeScreen = () => {
	const [treeProps, setTreeProps] = useState({
		initialStartX: 0,
		initialStartY: 0,
		initialShapeLength: 0,
		initialAngle: 0,
		initialBranchWidth: 0,
		color1: '',
		color2: '',
		initialCurve1: 0,
		initialCurve2: 0,
		shapeLengthMinLimit: 0,
		width: 0,
		height: 0,
	});
	const [canvasProps, setCanvasProps] = useState({
		width: 0,
		height: 0,
	});
	const [isDrawingTree, setIsDrawingTree] = useState(false);

	const treePropsRef = useRef({
		initialStartX: 0,
		initialStartY: 0,
		initialShapeLength: 0,
		initialAngle: 0,
		initialBranchWidth: 0,
		color1: '', // `#${Math.random().toString(16).slice(-6)}`,
		color2: '', // `#${Math.random().toString(16).slice(-6)}`,
		initialCurve1: 0,
		initialCurve2: 0,
		shapeLengthMinLimit: 0,
		width: 0,
		height: 0,
	});

	const setTreePropsRef = useCallback(
		(props: Partial<typeof treePropsRef.current>) => {
			treePropsRef.current = {
				...treePropsRef.current,
				...props,
			};
		},
		[]
	);

	const generateButtonRef = useRef<HTMLButtonElement>(null);
	const generateRandomButtonRef = useRef<HTMLButtonElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const canvasPropsRef = useRef<{
		context: CanvasRenderingContext2D | null;
		width: number;
		height: number;
	}>({
		context: canvasRef.current?.getContext('2d') || null,
		width: 0,
		height: 0,
	});
	const setCanvasPropsRef = useCallback(
		(props: Partial<typeof canvasPropsRef.current>) => {
			canvasPropsRef.current = {
				...canvasPropsRef.current,
				...props,
			};
		},
		[]
	);

	const drawTree: TDrawTree = useCallback(
		({
			startX,
			startY,
			shapeLength,
			angle,
			branchWidth,
			color1,
			color2,
			curve,
			curve2,
			shapeLengthMinLimit,
			context,
		}) => {
			// if (!canvasPropsRef.current.init) return;

			context.beginPath();
			context.save();
			context.strokeStyle = color1;
			context.fillStyle = color2;

			context.shadowBlur = 15;
			context.shadowColor = 'rgba(0, 0, 0, 0.5)';

			context.lineWidth = branchWidth;
			context.translate(startX, startY);
			context.rotate((Math.PI / 180) * angle);
			context.moveTo(0, 0);

			// The line direction/angle
			if (angle > 0) {
				context.bezierCurveTo(
					20,
					-shapeLength / 2,
					Math.random() >= 0.5 ? 20 : -20,
					-shapeLength,
					0,
					-shapeLength /* * 1.12*/
				);
			} else {
				context.bezierCurveTo(
					20,
					-shapeLength / 2,
					Math.random() >= 0.5 ? 20 : -20,
					-shapeLength,
					0,
					-shapeLength /* * 1.12*/
				);
			}

			context.stroke();
			context.closePath();

			// Draw leaves ends
			if (shapeLength < shapeLengthMinLimit) {
				context.beginPath();
				context.arc(0, -shapeLength, 15, 0, Math.PI / 2);
				context.fill();
				context.closePath();
				context.restore();
				return;
			}
			curve = Math.random() * 10 + 10;

			drawTree({
				startX: 0,
				startY: -shapeLength,
				shapeLength: shapeLength * 0.75,
				angle: angle + curve,
				branchWidth: branchWidth * 0.65,
				color1,
				color2,
				curve,
				curve2,
				shapeLengthMinLimit,
				context,
			});
			drawTree({
				startX: 0,
				startY: -shapeLength,
				shapeLength: shapeLength * 0.75,
				angle: angle - curve,
				branchWidth: branchWidth * 0.65,
				color1,
				color2,
				curve,
				curve2,
				shapeLengthMinLimit,
				context,
			});

			context.restore();
		},
		[]
	);

	const generateTree = useCallback(
		({
			context,
			canvasElem,
		}: {
			context: CanvasRenderingContext2D;
			canvasElem: /*RefObject<HTMLCanvasElement>.current: */ HTMLCanvasElement;
		}) => {
			if (isDrawingTree) return;

			context.clearRect(0, 0, canvasElem.width, canvasElem.height);

			if (generateButtonRef.current) {
				generateButtonRef.current.style.backgroundColor =
					treePropsRef.current.color1;
				generateButtonRef.current.style.borderColor =
					treePropsRef.current.color2;
				generateButtonRef.current.style.color = treePropsRef.current.color2;
				generateButtonRef.current.disabled = true;
			}
			if (generateRandomButtonRef.current) {
				generateRandomButtonRef.current.style.backgroundColor =
					treePropsRef.current.color1;
				generateRandomButtonRef.current.style.borderColor =
					treePropsRef.current.color2;
				generateRandomButtonRef.current.style.color =
					treePropsRef.current.color2;
				generateRandomButtonRef.current.disabled = true;
			}

			setIsDrawingTree(true);
			(async () =>
				await new Promise((resolve) => setTimeout(() => resolve(null), 100)))();

			drawTree({
				startX: treePropsRef.current.initialStartX,
				startY: treePropsRef.current.initialStartY,
				shapeLength: treePropsRef.current.initialShapeLength,
				angle: treePropsRef.current.initialAngle,
				branchWidth: treePropsRef.current.initialBranchWidth,
				color1: treePropsRef.current.color1,
				color2: treePropsRef.current.color2,
				curve: treePropsRef.current.initialCurve1,
				curve2: treePropsRef.current.initialCurve2,
				shapeLengthMinLimit: treePropsRef.current.shapeLengthMinLimit,
				context,
			});
			setIsDrawingTree(false);

			if (generateButtonRef.current) generateButtonRef.current.disabled = false;

			if (generateRandomButtonRef.current)
				generateRandomButtonRef.current.disabled = false;
		},
		[drawTree, isDrawingTree]
	);

	const generateRandomTree = useCallback(async () => {
		if (!canvasRef.current || !canvasPropsRef.current.context) return;

		const props = {
			initialStartX: canvasPropsRef.current.width / 2,
			initialStartY: canvasPropsRef.current.height + 20,
			initialShapeLength: Math.floor(Math.random() * 20 + 100),
			initialAngle: 0,
			initialBranchWidth: Math.random() * 70 + 1,
			color1: `#${Math.random().toString(16).slice(-6)}`,
			color2: `#${Math.random().toString(16).slice(-6)}`,
			initialCurve1: Math.random() * 10 + 10,
			initialCurve2: Math.random() * 50 + 25,
			shapeLengthMinLimit: 3,
		};

		setTreePropsRef(props);
		setTreeProps((prevProps) => ({
			...prevProps,
			...props,
		}));

		// const shapeLengthMinLimit = Math.random() * 10 + 5;
		await new Promise((resolve) => setTimeout(() => resolve(null), 100));

		if (canvasPropsRef.current)
			generateTree({
				context: canvasPropsRef.current.context,
				canvasElem: canvasRef.current,
			});
	}, [generateTree, setTreePropsRef]);

	useEffect(() => {
		if (!canvasRef.current) return;
		if (!canvasPropsRef.current.context) {
			canvasPropsRef.current.context = canvasRef.current.getContext('2d');
			if (canvasPropsRef.current.context)
				canvasPropsRef.current.context.imageSmoothingEnabled = false;
		}

		const canvasProps = {
			width: parseInt(getComputedStyle(canvasRef.current).width),
			height: parseInt(getComputedStyle(canvasRef.current).height),
		};

		let isSizesChanged = false;
		if (canvasProps.width !== canvasRef.current.width) {
			//
			canvasRef.current.width = canvasProps.width;
			isSizesChanged = true;
		}
		if (canvasProps.height !== canvasRef.current.height) {
			//
			canvasRef.current.height = canvasProps.height;
			isSizesChanged = true;
		}

		if (isSizesChanged) {
			canvasPropsRef.current.context?.scale(
				canvasProps.width / 550,
				canvasProps.height / 460
			);
		}

		setCanvasPropsRef(canvasProps);
		setCanvasProps((prevProps) => ({
			...prevProps,
			...canvasProps,
		}));

		async () =>
			await new Promise((resolve) => setTimeout(() => resolve(null), 100));

		// if (!canvasPropsRef.current.init) {
		generateRandomTree();
		// canvasPropsRef.current.init = true;
		// }
	}, [generateRandomTree, setCanvasPropsRef, setTreePropsRef]);

	useEffect(() => {
		return () => {
			setTreePropsRef({
				initialStartX: 0,
				initialStartY: 0,
				initialShapeLength: 0,
				initialAngle: 0,
				initialBranchWidth: 0,
				color1: '', // `#${Math.random().toString(16).slice(-6)}`,
				color2: '', // `#${Math.random().toString(16).slice(-6)}`,
				initialCurve1: 0,
				initialCurve2: 0,
				shapeLengthMinLimit: 0,
				width: 0,
				height: 0,
			});

			setCanvasPropsRef({
				context: null,
				width: 0,
				height: 0,
			});
		};
	}, [setCanvasPropsRef, setTreePropsRef]);

	return (
		<>
			<NextSeo
				title={'Drawing Fractal Tree Animation | LogNMaze'}
				description="Generate fractal tree randomly or you can define and change its properties. Fractals are never-ending patterns created by repeating mathematical equations, which on any scale, on any level of zoom, look roughly the same. In other words, a geometric object which's basic structure, rough or fragmented, repeats itself in different scales."
				canonical={'https://lognmaze.com/cg_creative_art/fractal_tree'}
				// openGraph={{
				// 	locale: `${newsItemData.type_data.iso_language}_${newsItemData.type_data.iso_country}`,
				// }}

				openGraph={{
					title: 'Drawing Fractal Tree Animation | LogNMaze',
					description:
						"Generate fractal tree randomly or you can define and change its properties. Fractals are never-ending patterns created by repeating mathematical equations, which on any scale, on any level of zoom, look roughly the same. In other words, a geometric object which's basic structure, rough or fragmented, repeats itself in different scales.",
					url: 'https://lognmaze.com/cg_creative_art/fractal_tree',
					type: 'article',

					...(() => {
						const images = [
							{
								url: 'https://lognmaze.com/favicon.ico',
								width: 250,
								height: 250,
								alt: 'LogNMaze Logo',
							},
						];

						return {
							images,
						};
					})(),
				}}
			/>
			<main className={helpersClasses.main}>
				<header className={classes.header}>
					<SectionWrapper>
						<h1>Drawing Fractal Tree Animation</h1>
					</SectionWrapper>
				</header>
				<section className={classes.mainSection}>
					<FormComponent
						className={classes.form}
						onSubmit={(event: FormEvent) => {
							event.preventDefault();

							if (!canvasRef.current || !canvasPropsRef.current.context) return;

							if (!canvasPropsRef.current.context || !canvasRef.current) return;
							treePropsRef.current = treeProps;

							const tempCanvasProps = {
								width: parseInt(getComputedStyle(canvasRef.current).width),
								height: parseInt(getComputedStyle(canvasRef.current).height),
							};

							let isSizesChanged = false;
							if (tempCanvasProps.width !== canvasProps.width) {
								// canvasRef.current.style.width = canvasProps.width / 10 + 'rem';
								canvasRef.current.width = canvasProps.width;
								isSizesChanged = true;
							}
							if (tempCanvasProps.height !== canvasProps.height) {
								// canvasRef.current.style.height = canvasProps.height / 10 + 'rem';
								canvasRef.current.height = canvasProps.height;
								isSizesChanged = true;
							}

							if (isSizesChanged) {
								canvasPropsRef.current.context?.scale(
									canvasProps.width / 550,
									canvasProps.height / 460
								);
							}
							setCanvasPropsRef(canvasProps);

							async () =>
								await new Promise((resolve) =>
									setTimeout(() => resolve(null), 0)
								);

							generateTree({
								context: canvasPropsRef.current.context,
								canvasElem: canvasRef.current,
							});
						}}
					>
						<fieldset className={classes.fieldset}>
							<legend>Canvas Properties</legend>
							{canvasPropertiesFieldsetElement
								.sort((a, b) => a.label.localeCompare(b.label))
								.map((item) => (
									<FormControlComponent
										key={item.id}
										className={classes.formControl}
									>
										<LabelComponent htmlFor={item.id}>
											{item.label}
										</LabelComponent>
										<InputComponent
											onChange={(event: ChangeEvent<HTMLInputElement>) =>
												setCanvasProps((prevProps) => ({
													...prevProps,
													[event.target.name]:
														item.type === 'number'
															? parseInt(event.target.value)
															: event.target.value,
												}))
											}
											value={canvasProps[item.name as keyof typeof canvasProps]}
											type={item.type}
											name={item.name}
											id={item.id}
										/>
									</FormControlComponent>
								))}
						</fieldset>
						<fieldset className={classes.fieldset}>
							<legend>Tree Properties</legend>

							{treePropertiesFieldsetElement
								.sort((a, b) => a.label.localeCompare(b.label))
								.map((item) => (
									<FormControlComponent
										key={item.id}
										className={classes.formControl}
									>
										<LabelComponent htmlFor={item.id}>
											{item.label}{' '}
											{/* {item?.labelSmallText ? (
												<small>{item?.labelSmallText}</small>
											) : null} */}
										</LabelComponent>
										<InputComponent
											onChange={(event: ChangeEvent<HTMLInputElement>) =>
												setTreeProps((prevProps) => ({
													...prevProps,
													[event.target.name]:
														item.type === 'number'
															? parseInt(event.target.value)
															: event.target.value,
												}))
											}
											value={treeProps[item.name as keyof typeof treeProps]}
											type={item.type}
											name={item.name}
											id={item.id}
										/>
									</FormControlComponent>
								))}
						</fieldset>
						<FormControlComponent className={classes.formControl}>
							<button
								className={`${ButtonComponentClasses.default} ${classes.generateButton}`}
								ref={generateButtonRef}
								type='submit'
								disabled={isDrawingTree}
							>
								Generate
							</button>
						</FormControlComponent>
					</FormComponent>

					<div className={classes.canvasSection}>
						<div className={classes.canvasContainer}>
							<canvas width={550} height={460} ref={canvasRef}></canvas>
						</div>
						<button
							className={classes.generateRandomTreeButton}
							ref={generateRandomButtonRef}
							onClick={() => generateRandomTree()}
							disabled={isDrawingTree}
						>
							Generate Randomly
						</button>
					</div>
				</section>
				<footer className={classes.footer}>
					<SectionWrapper>
						<p>
							Fractals are never-ending patterns created by repeating
							mathematical equations, which on any scale, on any level of zoom,
							look roughly the same. In other words, a geometric object
							which&apos;s basic structure, rough or fragmented, repeats itself
							in different scales.
						</p>
					</SectionWrapper>
				</footer>
			</main>
		</>
	);
};

export default FractalTreeScreen;
