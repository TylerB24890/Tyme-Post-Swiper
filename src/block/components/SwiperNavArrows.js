/**
 * Swiper Settings
 * Controls Swiper Carousel Navigation
 *
 * Lets the user choose to show the next/previous arrows
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Path, SVG } = wp.components;

const NextArrow = ( { color } ) => (
	<SVG
		viewBox="0 0 129 129"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			fill={ color }
			d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
		/>
	</SVG>
);

const PrevArrow = ( { color } ) => (
	<SVG
		viewBox="0 0 129 129"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			fill={ color }
			d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"
		/>
	</SVG>
);

export { NextArrow, PrevArrow };
