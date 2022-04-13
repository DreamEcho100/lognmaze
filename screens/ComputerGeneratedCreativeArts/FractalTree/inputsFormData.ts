import { InputHTMLAttributes } from 'react';
interface TFieldsetInput {
	name: string;
	type: string;
	label: string;
	id: string;
	extraInputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const canvasPropertiesFieldsetInputs: TFieldsetInput[] = [
	{
		name: 'width',
		type: 'number',
		label: 'Canvas Width',
		id: 'canvasWidth',
		extraInputProps: {
			min: 1,
		},
	},
	{
		name: 'height',
		type: 'number',
		label: 'Canvas Height',
		id: 'canvasHeight',
		extraInputProps: {
			min: 1,
		},
	},
];

export const treePropertiesFieldsetInputs: TFieldsetInput[] = [
	{
		label: 'Initial Start X',
		type: 'number',
		name: 'initialStartX',
		id: 'initialStartX',
		// extraInputProps: {
		// 	min: 0,
		// },
	},
	{
		label: 'Initial Start Y',
		type: 'number',
		name: 'initialStartY',
		id: 'initialStartY',
		// extraInputProps: {
		// 	min: 0,
		// },
	},
	{
		label: 'Initial Shape Length X',
		type: 'number',
		name: 'initialShapeLength',
		id: 'initialShapeLength',
		// extraInputProps: {
		// 	min: 1,
		// },
	},
	{
		label: 'Initial Angle',
		type: 'number',
		name: 'initialAngle',
		id: 'initialAngle',
		// extraInputProps: {
		// 	min: 0,
		// },
	},
	{
		label: 'Initial Branch Width',
		type: 'number',
		name: 'initialBranchWidth',
		id: 'initialBranchWidth',
		// extraInputProps: {
		// 	min: 1,
		// },
	},
	{ label: 'InputComponent', type: 'color', name: 'color1', id: 'color1' },
	{ label: 'InputComponent', type: 'color', name: 'color2', id: 'color2' },
	{
		label: 'Initial Curve 1',
		type: 'number',
		name: 'initialCurve1',
		id: 'initialCurve1',
		// extraInputProps: {
		// 	min: 0,
		// },
	},
	{
		label: 'Initial Curve 2',
		type: 'number',
		name: 'initialCurve2',
		id: 'initialCurve2',
		// extraInputProps: {
		// 	min: 0,
		// },
	},
	{
		label: 'Shape Length Min Limit',
		type: 'number',
		name: 'shapeLengthMinLimit',
		id: 'shapeLengthMinLimit',
		// extraInputProps: {
		// 	min: 1,
		// },
	},
	// {
	// 	label: 'Drawing Speed',
	// 	labelSmallText: '(in ms)',
	// 	type: 'number',
	// 	name: 'drawingSpeed',
	// 	id: 'drawingSpeed',
	// },
];
