import type { ChangeEvent, FormEvent } from 'react';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NextSeo } from 'next-seo';
import ButtonComponentClasses from '@styles/components/common/independent/Button/index.module.css';
import helpersClasses from '@styles/helpers.module.css';
import classes from './index.module.css';
import FromField from '@components/shared/common/FormField';
// import InputComponent from '@commonComponentsIndependent/Input';
// import FormControlComponent from '@commonComponentsIndependent/FormControl';
// import LabelComponent from '@commonComponentsIndependent/Label';
// import FormComponent from '@commonComponentsIndependent/Form';
// import section from '@commonComponentsIndependent/section';

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
	shapeLengthMinLimit
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
		drawingSpeed: 300
	});
	const [canvasProps, setCanvasProps] = useState({
		width: 0,
		height: 0,
		scaleX: 1,
		scaleY: 1
	});
	const [isDrawingTree, setIsDrawingTree] = useState(false);

	const treePropsRef = useRef({
		initialStartX: 0,
		initialStartY: 0,
		initialShapeLength: 120,
		initialAngle: -Math.PI * 0.5,
		initialBranchWidth: 4,
		color1: '', // `#${Math.random().toString(16).slice(-6)}`,
		color2: '', // `#${Math.random().toString(16).slice(-6)}`,
		initialCurve1: 0,
		initialCurve2: 0,
		shapeLengthMinLimit: 3,
		width: 0,
		height: 0,
		drawingSpeed: 300,
		isDrawingLeavesStart: false
	});

	const setTreePropsRef = useCallback(
		(props: Partial<typeof treePropsRef.current>) => {
			treePropsRef.current = {
				...treePropsRef.current,
				...props
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
		scaleX: number;
		scaleY: number;
	}>({
		context: canvasRef.current?.getContext('2d') || null,
		width: 0,
		height: 0,
		scaleX: 1,
		scaleY: 1
	});
	const setCanvasPropsRef = useCallback(
		(props: Partial<typeof canvasPropsRef.current>) => {
			canvasPropsRef.current = {
				...canvasPropsRef.current,
				...props
			};
		},
		[]
	);

	const canvasPropertiesFieldsetInputs = [
		{
			name: 'width',
			type: 'number',
			label: 'Canvas Width',
			id: 'canvasWidth'
		},
		{
			name: 'height',
			type: 'number',
			label: 'Canvas Height',
			id: 'canvasHeight'
		},
		{
			name: 'scaleX',
			type: 'number',
			label: 'Scale X',
			id: 'scaleX'
		},
		{
			name: 'scaleY',
			type: 'number',
			label: 'Scale Y',
			id: 'scaleY'
		}
	];

	const treePropertiesFieldsetInputs = [
		{
			label: 'Initial Start X',
			type: 'number',
			name: 'initialStartX',
			id: 'initialStartX'
		},
		{
			label: 'Initial Start Y',
			type: 'number',
			name: 'initialStartY',
			id: 'initialStartY'
		},
		{
			label: 'Initial Shape Length X',
			type: 'number',
			name: 'initialShapeLength',
			id: 'initialShapeLength'
		},
		{
			label: 'Initial Angle',
			type: 'number',
			name: 'initialAngle',
			id: 'initialAngle'
		},
		{
			label: 'Initial Branch Width',
			type: 'number',
			name: 'initialBranchWidth',
			id: 'initialBranchWidth'
		},
		{ label: 'InputComponent', type: 'color', name: 'color1', id: 'color1' },
		{ label: 'InputComponent', type: 'color', name: 'color2', id: 'color2' },
		{
			label: 'Initial Curve 1',
			type: 'number',
			name: 'initialCurve1',
			id: 'initialCurve1'
		},
		{
			label: 'Initial Curve 2',
			type: 'number',
			name: 'initialCurve2',
			id: 'initialCurve2'
		},
		{
			label: 'Shape Length Min Limit',
			type: 'number',
			name: 'shapeLengthMinLimit',
			id: 'shapeLengthMinLimit'
		},
		{
			label: 'Drawing Speed',
			labelSmallText: '(in ms)',
			type: 'number',
			name: 'drawingSpeed',
			id: 'drawingSpeed'
		}
	];

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
			context
		}) => {
			context.lineWidth = branchWidth;

			// draw the branch
			context.beginPath();
			context.strokeStyle = color1;
			context.fillStyle = color2;

			context.shadowBlur = 15;
			context.shadowColor = 'rgba(0, 0, 0, 0.2)';
			context.lineTo(startX, startY);

			// get the end position
			startX += Math.cos(angle) * shapeLength;
			startY += Math.sin(angle) * shapeLength;

			// context.lineTo(startX, startY);
			// The line direction/angle
			if (angle > 0) {
				context.bezierCurveTo(
					startX + 20, // 20,
					startY + shapeLength * 0.5, // -shapeLength * 0.5,
					startX + (Math.random() >= 0.5 ? 30 : -30), // Math.random() >= 0.5 ? 20 : -20,
					startY + shapeLength * 0.5, // -shapeLength,
					startX, // - 20, // 0,
					startY - shapeLength * 0.01 /* * 1.12*/
				);
			} else {
				context.bezierCurveTo(
					startX + 20, // 20,
					startY + shapeLength * 0.75, // -shapeLength * 0.5,
					startX + (Math.random() >= 0.5 ? 20 : -20), // Math.random() >= 0.5 ? 20 : -20,
					startY + shapeLength * 0.75, // -shapeLength,
					startX, // - 20, // 0,
					startY - shapeLength * 0.01 /* * 1.12*/
				);
			}
			context.stroke();

			if (
				shapeLength > shapeLengthMinLimit &&
				!treePropsRef.current.isDrawingLeavesStart
			) {
				curve = 0.7 * Math.random() + 0.1; // * 10 + 10;
				curve2 = 0.7 * Math.random() + 0.1; // * 10 + 10;
				setTimeout(() => {
					return drawTree({
						startX,
						startY,
						shapeLength: shapeLength * 0.8,
						angle: angle + curve,
						branchWidth: branchWidth * 0.8,
						color1,
						color2,
						curve,
						curve2,
						shapeLengthMinLimit,
						context
					});
				}, treePropsRef.current.drawingSpeed);
				setTimeout(() => {
					drawTree({
						startX,
						startY,
						shapeLength: shapeLength * 0.75,
						angle: angle - curve2,
						branchWidth: branchWidth * 0.75,
						color1,
						color2,
						curve,
						curve2,
						shapeLengthMinLimit,
						context
					});
				}, treePropsRef.current.drawingSpeed);
				return;
			}

			if (!treePropsRef.current.isDrawingLeavesStart)
				setTreePropsRef({ isDrawingLeavesStart: true });
			// Draw leaves ends
			context.beginPath();
			context.arc(startX + 0, startY + -shapeLength, 15, 0, Math.PI * 0.65);
			context.fill();
			context.closePath();
			// context.restore();
			return;
		},
		[setTreePropsRef]
	);

	const generateTree = useCallback(
		({
			context,
			canvasElem
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
				context
			});
			if (treePropsRef.current.isDrawingLeavesStart)
				setTreePropsRef({ isDrawingLeavesStart: false });
			setIsDrawingTree(false);

			if (generateButtonRef.current && generateRandomButtonRef.current) {
				generateRandomButtonRef.current.disabled = false;
				generateButtonRef.current.disabled = false;
			}
		},
		[drawTree, isDrawingTree, setTreePropsRef]
	);

	const generateRandomTree = useCallback(async () => {
		if (!canvasRef.current || !canvasPropsRef.current.context) return;

		const props = {
			initialStartX: canvasPropsRef.current.width * 0.5,
			initialStartY: canvasPropsRef.current.height + 20,
			initialShapeLength: Math.floor(Math.random() * 20 + 100),
			initialAngle: -Math.PI * 0.5,
			initialBranchWidth: Math.random() * 70 + 1,
			color1: `#${Math.random().toString(16).slice(-6)}`,
			color2: `#${Math.random().toString(16).slice(-6)}`,
			initialCurve1: Math.random() * 10 + 10,
			initialCurve2: Math.random() * 50 + 25,
			shapeLengthMinLimit: 3
		};

		setTreePropsRef(props);
		setTreeProps((prevProps) => ({
			...prevProps,
			...props
		}));

		// const shapeLengthMinLimit = Math.random() * 10 + 5;
		await new Promise((resolve) => setTimeout(() => resolve(null), 300));

		if (canvasPropsRef.current)
			generateTree({
				context: canvasPropsRef.current.context,
				canvasElem: canvasRef.current
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
			height: parseInt(getComputedStyle(canvasRef.current).height)
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
			...canvasProps
		}));

		async () =>
			await new Promise((resolve) => setTimeout(() => resolve(null), 300));

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
								alt: 'LogNMaze Logo'
							}
						];

						return {
							images
						};
					})()
				}}
			/>
			<main className={helpersClasses.main}>
				<header className={classes.header}>
					<section>
						<h1>Drawing Fractal Tree Animation</h1>
					</section>
				</header>
				<section className={classes.mainSection}>
					<form
						className={classes.form}
						onSubmit={(event: FormEvent) => {
							event.preventDefault();

							if (!canvasRef.current || !canvasPropsRef.current.context) return;

							if (!canvasPropsRef.current.context || !canvasRef.current) return;
							treePropsRef.current = {
								...treePropsRef.current,
								...treeProps
							};

							const tempCanvasProps = {
								width: parseInt(getComputedStyle(canvasRef.current).width),
								height: parseInt(getComputedStyle(canvasRef.current).height)
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
									setTimeout(() => resolve(null), 300)
								);

							generateTree({
								context: canvasPropsRef.current.context,
								canvasElem: canvasRef.current
							});
						}}
					>
						<fieldset className={classes.fieldset}>
							<legend>Canvas Properties</legend>
							{canvasPropertiesFieldsetInputs
								.sort((a, b) => a.label.localeCompare(b.label))
								.map((item) => (
									<FromField
										key={item.id}
										className={classes.formControl}
										labelText={item.label}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setCanvasProps((prevProps) => ({
												...prevProps,
												[event.target.name]: parseInt(event.target.value)
											}))
										}
										value={canvasProps[item.name as keyof typeof canvasProps]}
										type={item.type}
										name={item.name}
										id={item.id}
									/>
								))}
						</fieldset>
						<fieldset className={classes.fieldset}>
							<legend>Tree Properties</legend>

							{treePropertiesFieldsetInputs
								.sort((a, b) => a.label.localeCompare(b.label))
								.map((item) => (
									<FromField
										key={item.id}
										className={classes.formControl}
										labelText={item.label}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											setCanvasProps((prevProps) => ({
												...prevProps,
												[event.target.name]: parseInt(event.target.value)
											}))
										}
										value={canvasProps[item.name as keyof typeof canvasProps]}
										type={item.type}
										name={item.name}
										id={item.id}
									/>
								))}
						</fieldset>
						<div className={classes.formControl}>
							<button
								className={`${ButtonComponentClasses.default} ${classes.generateButton}`}
								ref={generateButtonRef}
								type='submit'
								disabled={isDrawingTree}
							>
								Generate
							</button>
						</div>
					</form>

					<div className={classes.canvasSection}>
						<div className={classes.canvasContainer}>
							<canvas width={800} height={500} ref={canvasRef}></canvas>
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
					<section>
						<p>
							Fractals are never-ending patterns created by repeating
							mathematical equations, which on any scale, on any level of zoom,
							look roughly the same. In other words, a geometric object
							which&apos;s basic structure, rough or fragmented, repeats itself
							in different scales.
						</p>
					</section>
				</footer>
			</main>
		</>
	);
};

export default FractalTreeScreen;
