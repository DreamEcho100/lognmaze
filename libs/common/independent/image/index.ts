//  https://images.weserv.nl/docs/

/*
# Quick reference

| Name                    | GET             | Description                                                             |
| Width                   | `w`             | Sets the width of the image, in pixels.                                 |
| ------------------------|-----------------|-------------------------------------------------------------------------|
| Height                  | `h`             | Sets the height of the image, in pixels.                                |
| Device pixel ratio      | `dpr`           | Sets the output density of the image.                                   |
| Fit                     | `fit`           | Sets how the image is fitted to its target dimensions.                  |
| Contain background      | `cbg`           | Sets the background color when using `&fit=contain`.                    |
| Without enlargement     | `we`            | Do not enlarge the image.                                               |
| Alignment position      | `a`             | Sets how the image is aligned.                                          |
| Rectangle crop          | `crop`          | Crops the image to specific dimensions.                                 |
| Pre-resize crop         | `precrop`       | A pre-resize crop behaviour.                                            |
| Trim                    | `trim`          | Trim "boring" pixels from all edges.                                    |
| Masking                 | `mask`          | Sets the mask type from a predefined list.                              |
| Mask trim               | `mtrim`         | Removes the remaining whitespace from the mask.                         |
| Mask background         | `mbg`           | Sets the background color of the mask.                                  |
| Flip                    | `flip`          | Flip the image about the vertical Y axis.                               |
| Flop                    | `flop`          | Flop the image about the horizontal X axis.                             |
| Rotation                | `ro`            | Rotates the image.                                                      |
| Rotation background     | `rbg`           | Sets the background color when rotating by arbitrary angles.            |
| Background              | `bg`            | Sets the background color of the image.                                 |
| Blur                    | `blur`          | Adds a blur effect to the image.                                        |
| Contrast                | `con`           | Adjusts the image contrast.                                             |
| Filter                  | `filt`          | Applies a filter effect to the image.                                   |
| Gamma                   | `gam`           | Adjusts the image gamma.                                                |
| Modulate                | `mod`           | Transforms the image using brightness, saturation and hue rotation.     |
| Saturation              | `sat`           | Adjusts the saturation of the image.                                    |
| Hue rotation            | `hue`           | Applies a hue rotation to the image.                                    |
| Sharpen                 | `sharp`         | Sharpen the image.                                                      |
| Tint                    | `tint`          | Tint the image.                                                         |
| Adaptive filter         | `af`            | A filter algorithm that can be applied before compression.              |
| Base64 (data URL)       | `encoding`      | Encodes the image to be used directly in the `src=` of the `<img>`-tag. |
| Cache-Control           | `maxage`        | How long an image should be cached by the browser.                      |
| Compression level       | `l`             | The zlib compression level.                                             |
| Default image           | `default`       | Redirects to a default image when there is a problem loading an image.  |
| Filename                | `filename`      | To specify the filename.                                                |
| Interlace / progressive | `il`            | Adds interlacing to GIF and PNG. JPEG's become progressive.             |
| Number of pages         | `n`             | To select the the number of pages to render.                            |
| Output                  | `output`        | Encodes the image to a specific format.                                 |
| Page                    | `page`          | To load a given page.                                                   |
| Quality                 | `q`             | Defines the quality of the image.                                       |

*/

type TImagesWeservNlLoaderProps = {
	url: string;
	w?: number;
	h?: number;
	dpr?: number;

	fit?: 'inside' | 'outside' | 'fill' | 'cover' | 'contain'; // https://images.weserv.nl/docs/fit.html#outside
	cbg?: boolean; // https://images.weserv.nl/docs/fit.html#contain
	we?: boolean; // https://images.weserv.nl/docs/fit.html#without-enlargement

	// https://images.weserv.nl/docs/crop.html#rectangle-crop
	cx?: number;
	cy?: number;
	cw?: number;
	ch?: number;
	precrop?: boolean;
	trim?: number; // https://images.weserv.nl/docs/crop.html#trim
	mask?:
		| 'circle'
		| 'ellipse'
		| 'triangle'
		| 'triangle-180'
		| 'pentagon'
		| 'pentagon-180'
		| 'hexagon'
		| 'square'
		| 'star'
		| 'heart'; // https://images.weserv.nl/docs/mask.html#mask-type
	mtrim?: boolean;
	mbg?: string; // https://images.weserv.nl/docs/mask.html#mask-background
	// flip?: string;
	// flop?: string;
	// ro?: string;
	// rbg?: string;
	bg?: string; // https://images.weserv.nl/docs/adjustment.html#background
	blur?: number; // https://images.weserv.nl/docs/adjustment.html#blur
	// con?: string;
	// filt?: string;
	// gam?: string;
	// mod?: string;
	// sat?: string;
	// hue?: string;
	// sharp?: string;
	// tint?: string;
	// af?: string;
	// encoding?: string;
	// maxage?: string;
	// l?: string;
	// default?: string;
	// filename?: string;
	// il?: string;
	// n?: string;
	// output?: string;
	// page?: string;
	// q?: string;
} & ({
	// https://images.weserv.nl/docs/crop.html
	a?:
		| 'center'
		| 'top'
		| 'right'
		| 'bottom'
		| 'left'
		| 'top-left'
		| 'bottom-left'
		| 'bottom-right'
		| 'top-right'
		| 'entropy'
		| 'attention';
} & {
	// https://images.weserv.nl/docs/crop.html#focal-point
	a?: 'focal';
	fpx?: number;
	fpy?: number;
});

export const imagesWeservNlLoader = ({
	url,
	...props
}: TImagesWeservNlLoaderProps) =>
	`//images.weserv.nl/?url=${url}${(() => {
		let item: keyof typeof props;
		let extraQueries = '';

		// const tempObj = {
		// 	we: true,
		//   cbg: true,
		//   precrop: true
		// };

		for (item in props) {
			// if (item in tempObj) extraQueries += item;
			// else
			extraQueries += `&${item}=${props[item]}`;
		}
		return extraQueries;
	})()}`;
