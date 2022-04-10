import { NextPage } from 'next';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import helpersClasses from '@styles/helpers.module.css';
import InputComponent from '@commonComponentsIndependent/Input';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import LabelComponent from '@commonComponentsIndependent/Label';
import FormComponent from '@commonComponentsIndependent/Form';
import ButtonComponent from '@commonComponentsIndependent/Button';

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

const DrawingFractalTrees: NextPage<null> = () => {
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
		initialShapeLengthMinLimit: 0,
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
		initialShapeLengthMinLimit: 0,
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

	const buttonRef = useRef<HTMLButtonElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const canvasPropsRef = useRef<{
		context: CanvasRenderingContext2D | null;
		init: boolean;
	}>({
		context: canvasRef.current?.getContext('2d') || null,
		init: false,
	});

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
			if (!canvasPropsRef.current.init) return;

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

			if (buttonRef.current) {
				buttonRef.current.style.backgroundColor = treePropsRef.current.color1;
				buttonRef.current.style.borderColor = treePropsRef.current.color2;
				buttonRef.current.style.color = treePropsRef.current.color2;
				buttonRef.current.disabled = true;
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
				shapeLengthMinLimit: treePropsRef.current.initialShapeLengthMinLimit,
				context,
			});
			setIsDrawingTree(false);

			if (buttonRef.current) {
				buttonRef.current.disabled = false;
			}
		},
		[drawTree, isDrawingTree]
	);

	const generateRandomTree = useCallback(async () => {
		if (!canvasRef.current || !canvasPropsRef.current.context) return;

		const props = {
			initialStartX: canvasRef.current.width / 2,
			initialStartY: canvasRef.current.height + 20,
			initialShapeLength: Math.floor(Math.random() * 20 + 100),
			initialAngle: 0,
			initialBranchWidth: Math.random() * 70 + 1,
			color1: `#${Math.random().toString(16).slice(-6)}`,
			color2: `#${Math.random().toString(16).slice(-6)}`,
			initialCurve1: Math.random() * 10 + 10,
			initialCurve2: Math.random() * 50 + 25,
			initialShapeLengthMinLimit: 3,
		};

		setTreePropsRef(props);
		setTreeProps(props);

		// const shapeLengthMinLimit = Math.random() * 10 + 5;
		await new Promise((resolve) => setTimeout(() => resolve(null), 0));

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
		canvasRef.current.width = parseInt(
			getComputedStyle(canvasRef.current).width
		);
		canvasRef.current.height = parseInt(
			getComputedStyle(canvasRef.current).height
		);

		if (!canvasPropsRef.current.init) {
			generateRandomTree();
			canvasPropsRef.current.init = true;
		}
	}, [generateRandomTree, setTreePropsRef]);

	return (
		<main className={helpersClasses.main}>
			<section>
				<h1>Drawing Fractal Tree Animation</h1>
				<div className=''>
					<FormComponent
						onSubmit={(event: FormEvent) => {
							event.preventDefault();

							if (!canvasRef.current || !canvasPropsRef.current.context) return;
							treePropsRef.current = treeProps;

							generateTree({
								context: canvasPropsRef.current.context,
								canvasElem: canvasRef.current,
							});
						}}
					>
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
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
						<FormControlComponent>
							<LabelComponent htmlFor='initialShapeLengthMinLimit'>
								Initial Shape Length Min Limit
							</LabelComponent>
							<InputComponent
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setTreeProps((prevProps) => ({
										...prevProps,
										[event.target.name]: parseInt(event.target.value),
									}))
								}
								value={treeProps.initialShapeLengthMinLimit}
								type='number'
								name='initialShapeLengthMinLimit'
								id='initialShapeLengthMinLimit'
							/>
						</FormControlComponent>
						<ButtonComponent
							style={{
								borderWidth: '0.5rem',
								borderStyle: ' solid',
								textShadow: 'black 0.1rem 0.1rem 0.5rem',
								boxShadow: 'inset black 0.1rem 0.1rem 1rem',
								padding: '0.25em',
							}}
							type='submit'
							disabled={isDrawingTree}
						>
							Generate
						</ButtonComponent>
					</FormComponent>
				</div>
				<div
					style={{
						width: '100%',
						minHeight: '30rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'stretch',
						justifyContent: 'stretch',
					}}
				>
					<canvas width={800} height={500} ref={canvasRef}></canvas>
					<button
						style={{
							borderWidth: '0.5rem',
							borderStyle: ' solid',
							textShadow: 'black 0.1rem 0.1rem 0.5rem',
							boxShadow: 'inset black 0.1rem 0.1rem 1rem',
							padding: '0.25em',
						}}
						id='generate-tree-btn'
						ref={buttonRef}
						onClick={() => generateRandomTree()}
						disabled={isDrawingTree}
					>
						Generate Randomly
					</button>
				</div>
			</section>
		</main>
	);
};

export default DrawingFractalTrees;
