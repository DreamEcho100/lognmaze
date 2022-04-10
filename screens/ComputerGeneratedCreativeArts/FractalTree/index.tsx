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

			if (angle > 0) {
				context.bezierCurveTo(
					20,
					-shapeLength / 2,
					20,
					-shapeLength,
					0,
					-shapeLength /* * 1.12*/
				);
			} else {
				context.bezierCurveTo(
					20,
					-shapeLength / 2,
					20,
					-shapeLength,
					0,
					-shapeLength /* * 1.12*/
				);
			}

			context.stroke();
			context.closePath();

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
				color1: color1,
				color2: color2,
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
				color1: color1,
				color2: color2,
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

			if (generateButtonRef.current && generateRandomButtonRef.current) {
				generateButtonRef.current.style.backgroundColor =
					treePropsRef.current.color1;
				generateButtonRef.current.style.borderColor =
					treePropsRef.current.color2;
				generateButtonRef.current.style.color = treePropsRef.current.color2;
				generateButtonRef.current.disabled = true;

				generateRandomButtonRef.current.style.backgroundColor =
					treePropsRef.current.color1;
				generateRandomButtonRef.current.style.borderColor =
					treePropsRef.current.color2;
				generateRandomButtonRef.current.style.color =
					treePropsRef.current.color2;
				generateRandomButtonRef.current.disabled = true;
			}

			setIsDrawingTree(true);
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

			if (generateButtonRef.current && generateRandomButtonRef.current) {
				generateRandomButtonRef.current.disabled = false;
				generateButtonRef.current.disabled = false;
			}
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
		await new Promise((resolve) => setTimeout(() => resolve(null), 0));

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
				canvasProps.height / 450
			);
		}

		setCanvasPropsRef(canvasProps);
		setCanvasProps((prevProps) => ({
			...prevProps,
			...canvasProps,
		}));

		async () =>
			await new Promise((resolve) => setTimeout(() => resolve(null), 0));

		// if (!canvasPropsRef.current.init) {
		generateRandomTree();
		// canvasPropsRef.current.init = true;
		// }
	}, [generateRandomTree, setCanvasPropsRef, setTreePropsRef]);

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
									canvasProps.height / 450
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
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='canvasWidth'>Width</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setCanvasProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={canvasProps.width}
									type='number'
									name='width'
									id='canvasWidth'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='canvasHeight'>Height</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setCanvasProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={canvasProps.height}
									type='number'
									name='height'
									id='canvasHeight'
								/>
							</FormControlComponent>
						</fieldset>
						<fieldset className={classes.fieldset}>
							<legend>Tree Properties</legend>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialStartX'>
									Initial Start X
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialStartX}
									type='number'
									name='initialStartX'
									id='initialStartX'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialStartY'>
									Initial Start Y
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialStartY}
									type='number'
									name='initialStartY'
									id='initialStartY'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialShapeLength'>
									Initial Shape Length X
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialShapeLength}
									type='number'
									name='initialShapeLength'
									id='initialShapeLength'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialAngle'>
									Initial Angle
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialAngle}
									type='number'
									name='initialAngle'
									id='initialAngle'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialBranchWidth'>
									Initial Branch Width
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialBranchWidth}
									type='number'
									name='initialBranchWidth'
									id='initialBranchWidth'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='color1'>Color 1</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: event.target.value,
										}))
									}
									value={treeProps.color1}
									type='color'
									name='color1'
									id='color1'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='color2'>Color 2</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: event.target.value,
										}))
									}
									value={treeProps.color2}
									type='color'
									name='color2'
									id='color2'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialCurve1'>
									Initial Curve 1
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialCurve1}
									type='number'
									name='initialCurve1'
									id='initialCurve1'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='initialCurve2'>
									Initial Curve 2
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.initialCurve2}
									type='number'
									name='initialCurve2'
									id='initialCurve2'
								/>
							</FormControlComponent>
							<FormControlComponent className={classes.formControl}>
								<LabelComponent htmlFor='shapeLengthMinLimit'>
									Shape Length Min Limit
								</LabelComponent>
								<InputComponent
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setTreeProps((prevProps) => ({
											...prevProps,
											[event.target.name]: parseInt(event.target.value),
										}))
									}
									value={treeProps.shapeLengthMinLimit}
									type='number'
									name='shapeLengthMinLimit'
									id='shapeLengthMinLimit'
								/>
							</FormControlComponent>
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
							<canvas width={550} height={450} ref={canvasRef}></canvas>
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
