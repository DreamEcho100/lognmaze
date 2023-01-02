import FormField from '@components/shared/common/FormField';
import { handleButtonVariants } from '@components/shared/common/Button';

import { generateFractalTreeTool } from '@utils/core/appData/tools/cg-arts';

import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import ToolSEOTags from '@components/screens/Tools/components/ToolSEOTags';

import {
	canvasPropertiesFieldsetInputs,
	treePropertiesFieldsetInputs
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

const GenerateFractalTreeScreen = () => {
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
		height: 0
	});
	const [canvasProps, setCanvasProps] = useState({
		width: 0,
		height: 0
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
		height: 0
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
	}>({
		context: canvasRef.current?.getContext('2d') || null,
		width: 0,
		height: 0
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
				context
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
				context
			});

			context.restore();
		},
		[]
	);

	const generateTree = useCallback(
		({
			context,
			canvasElem
		}: {
			context: CanvasRenderingContext2D;
			canvasElem: /*RefObject<HTMLCanvasElement>.current: */ HTMLCanvasElement;
		}) => {
			if (isDrawingTree || !context) return;

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
				context
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
			shapeLengthMinLimit: 3
		};

		setTreePropsRef(props);
		setTreeProps((prevProps) => ({
			...prevProps,
			...props
		}));

		// const shapeLengthMinLimit = Math.random() * 10 + 5;
		await new Promise((resolve) => setTimeout(() => resolve(null), 100));

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
				canvasProps.width / 560,
				canvasProps.height / 460
			);
		}

		setCanvasPropsRef(canvasProps);
		setCanvasProps((prevProps) => ({
			...prevProps,
			...canvasProps
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
				height: 0
			});

			setCanvasPropsRef({
				context: null,
				width: 0,
				height: 0
			});
		};
	}, [setCanvasPropsRef, setTreePropsRef]);

	return (
		<>
			<ToolSEOTags data={generateFractalTreeTool} />
			<section className='section-p flex flex-col gap-4'>
				<header className='text-center'>
					<h1 className='text-h1'>Drawing Fractal Tree Animation</h1>
				</header>
				<form
					className='flex flex-col gap-2'
					onSubmit={(event: FormEvent) => {
						event.preventDefault();

						if (!canvasRef.current || !canvasPropsRef.current.context) return;

						if (!canvasPropsRef.current.context || !canvasRef.current) return;
						treePropsRef.current = treeProps;

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
								canvasProps.width / 560,
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
							canvasElem: canvasRef.current
						});
					}}
				>
					<fieldset className='flex flex-wrap justify-center gap-4'>
						<legend className='mx-auto'>
							<h2 className='text-h2'>Canvas Properties</h2>
						</legend>
						{canvasPropertiesFieldsetInputs
							.sort((a, b) => a.label.localeCompare(b.label))
							.map((item) => (
								<FormField
									labelVariants={{ w: 'fit' }}
									key={item.id}
									labelText={item.label}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										if (
											event.target.name === 'angle' ||
											(item.type === 'number' && event.target.valueAsNumber < 1)
										)
											return;

										setCanvasProps((prevProps) => {
											return {
												...prevProps,
												[event.target.name]:
													item.type === 'number'
														? event.target.valueAsNumber
														: event.target.value
											};
										});
									}}
									value={canvasProps[item.name as keyof typeof canvasProps]}
									type={item.type}
									name={item.name}
									id={item.id}
									{...(item?.extraInputProps || {})}
								/>
							))}
					</fieldset>
					<fieldset className='flex flex-wrap justify-center gap-4'>
						<legend className='mx-auto'>
							<h2 className='text-h2'>Tree Properties</h2>
						</legend>

						{treePropertiesFieldsetInputs
							.sort((a, b) => a.label.localeCompare(b.label))
							.map((item) => (
								<FormField
									labelVariants={{ w: 'fit' }}
									key={item.id}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										if (
											event.target.name === 'angle' ||
											(item.type === 'number' && event.target.valueAsNumber < 1)
										)
											return;

										setTreeProps((prevProps) => {
											return {
												...prevProps,
												[event.target.name]:
													item.type === 'number'
														? event.target.valueAsNumber
														: event.target.value
											};
										});
									}}
									value={treeProps[item.name as keyof typeof treeProps]}
									type={item.type}
									name={item.name}
									id={item.id}
									{...(item?.extraInputProps || {})}
								/>
							))}
					</fieldset>
					<button
						className={handleButtonVariants()}
						ref={generateButtonRef}
						type='submit'
						disabled={isDrawingTree}
					>
						Generate
					</button>
				</form>

				<div>
					<div>
						<canvas
							className='mx-auto'
							width={560}
							height={460}
							ref={canvasRef}
						></canvas>
					</div>
					<button
						className={handleButtonVariants({ className: 'w-full' })}
						ref={generateRandomButtonRef}
						onClick={() => generateRandomTree()}
						disabled={isDrawingTree}
					>
						Generate Randomly
					</button>
				</div>
				<footer className='text-center'>
					<p>
						Fractals are never-ending patterns created by repeating mathematical
						equations, which on any scale, on any level of zoom, look roughly
						the same. In other words, a geometric object which&apos;s basic
						structure, rough or fragmented, repeats itself in different scales.
					</p>
				</footer>
			</section>
		</>
	);
};

export default GenerateFractalTreeScreen;
